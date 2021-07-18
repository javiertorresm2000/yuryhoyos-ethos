import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { User } from 'src/app/user';

@Component({
    selector: 'app-denouncement',
    templateUrl: './denouncement.component.html',
    styleUrls: ['../../../assets/icon/icofont/css/icofont.scss']
})
export class DenouncementComponent implements OnInit {
    @ViewChild('modalLarge') modalLarge;
    @ViewChild('modalCloser') modalCloser;

    public denouncement: any = {};
    public uploader: FileUploader;

    public formCloser: FormGroup;
    public closerSubmitted: boolean;

    public form: FormGroup;
    public submitted: boolean;
    public sended: boolean;
    public closerSended: boolean;
    
    public updating: boolean;
    public locked: boolean = true;

    public uploadedImages: Array<string> = [];

    public conversations: Array<any> = []
    public reasonsToClose = []

    public users = []

    public selectedUser = ''
    public selectedPriority = ''

    constructor(public formBuilder: FormBuilder, private api: ApiService, private route: ActivatedRoute, private router: Router) {
        this.uploader = new FileUploader({
            url: api._host() + 'upload',
            maxFileSize: 10485760,
            queueLimit: 10,
            removeAfterUpload: true
        });

        this.uploader.onAfterAddingFile = (fileItem: FileItem)=> {
            console.log("added")
            console.log(fileItem.file.type)
            if (fileItem.file.type == 'application/x-msdownload') {
                fileItem.remove()
            }
        }

        this.form = this.formBuilder.group({
            message: [null, Validators.required],
            visible: null,
            wait: null,
            resource: null,
            denounces_id: [null, Validators.required]
        });

        this.formCloser = this.formBuilder.group({
            closing_description: [null, Validators.required],
            closing_reason_id: [null, Validators.required],
            denounces_id: [null, Validators.required],
            state: 'closed'
        });

        

    }

    save() {
        
    }

    close() {
        this.closerSubmitted = true
        if (this.formCloser.valid) {
            this.closerSended = true

            this.api.putDenouncement(this.formCloser.value.denounces_id, this.formCloser.value, de => {
                this.denouncement.state = 'closed'
                this.modalCloser.hide();
            })
        }
    }

    put(state) {
        this.updating = true

        const body: any = {
            state
        }

        if (this.selectedUser!='' && this.selectedPriority!='') {
            body.priority = this.selectedPriority
            body.investigator_id = this.selectedUser
        }

        this.api.putDenouncement(this.formCloser.value.denounces_id, body, de => {
            this.denouncement.state = state
        })
    }

    create() {
        this.modalLarge.show()
    }

    wait() {        
        if (!this.form.value.wait ) {
            this.form.patchValue({
                visible: true
            })

            this.form.controls.visible.disable()
        } else {
            this.form.controls.visible.enable()
        }
    }

    ngOnInit() {

        let id = this.route.snapshot.paramMap.get('id');
        
        this.form.patchValue({
            denounces_id: id
        })

        this.formCloser.patchValue({
            denounces_id: id
        })


        this.api.getDenouncement(id, data => {
            const denouncement = data.denouncement

            if (denouncement == null) {
                return this.router.navigate(['company-denouncement'])
            }

            denouncement.evidences = data.evidences.map(e => {
                e.name = this.fileAndExt(e.resource_url)
                return e
            })
            
            denouncement.anonymus = denouncement.informer_first_name 
                ? `${denouncement.informer_first_name} ${denouncement.informer_last_name}` 
                : 'Anónimo'
            
            denouncement.anonymus_email = denouncement.informer_first_name 
                ? denouncement.informer_email 
                : 'Anónimo'

            this.selectedUser = denouncement.investigator_id
            this.selectedPriority = denouncement.priority

            this.denouncement = denouncement

            this.api.getConversation(id, conversations => {
                this.conversations = conversations.map(c => this.conversationMapper(c))
            })

            this.api.getInvestigators(investigators => {
                this.users = investigators
            })
        })

        this.api.getCloseReasons(reasons => {
            this.reasonsToClose = reasons
        })
    }

    upload() {
        this.uploader.queue.forEach(file => {
            file.upload()
            file.onSuccess = (response: string, status: number, headers: any) => {
                this.uploadedImages.push(response)
            }
        })
    }

    send() {
        this.submitted = true

        if (this.form.valid) {
            this.sended = true


            if (this.uploader.queue.length > 0) {
                this.upload()
                this.uploader.onCompleteAll = () => {
                    this.form.patchValue({
                        resource: this.uploadedImages
                    })
                    console.log(this.uploadedImages)
                    this.sender()
                }
            } else {
                this.sender()
            }


        }
    }

    sender() {
        this.api.postConversation(this.form.value, conversation => {
            const changeStatus = !!this.form.value.wait
            this.modalLarge.hide()

            this.form.reset({
                denounces_id: this.denouncement.id
            })

            this.submitted = false
            this.sended = false

            if (changeStatus) {
                this.denouncement.state = 'wait_answer'
            }

            let cloned = this.conversations.slice()
            cloned.unshift(this.conversationMapper(conversation))

            this.conversations = cloned
        })
    }

    private fileAndExt(url) {
        if (! url) {
            return null
        }
        
        const matchs = url.match(/\w+\.\w+$/)

        return matchs.length ? matchs[0] : null
    }

    private conversationMapper(conversation) {
        conversation.file_name = this.fileAndExt(conversation.resource_url)

        return conversation
    }
}
