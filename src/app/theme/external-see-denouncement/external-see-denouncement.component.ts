import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import swal from 'sweetalert2';
import { User } from 'src/app/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';

@Component({
    selector: 'app-external-see-denouncement',
    templateUrl: './external-see-denouncement.component.html',
    styleUrls: ['../../../assets/icon/icofont/css/icofont.scss']
})
export class ExternalSeeDenouncementComponent implements OnInit {
    
    public denouncement: any = null
    public conversations = []

    public processing: boolean
    
    public denouncementId: number
    companyRoute

    @ViewChild('modalLarge') modalLarge;

    public form: FormGroup;
    public submitted: boolean;
    public sended: boolean;

    public uploader: FileUploader;
    public uploadedImages: Array<string> = [];

    constructor(private route: ActivatedRoute, private api: ApiService, public formBuilder: FormBuilder) { 
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
            resource: null,
            denounces_id: [null, Validators.required],
            external: true
        });
    }

    ngOnInit() {
        this.companyRoute = this.route.snapshot.paramMap.get('company');
    }

    search() {
        this.processing = true

        this.api.getDenouncementByIdAndCompany(this.companyRoute, this.denouncementId,
            (data)=> {
                this.processing = false

                if (data.denouncement == null) {
                    

                    return swal({
                        title: 'No se encontro',
                        text: 'Este id de denuncia no coincide con las denuncias de esta empresa',
                        type: 'error'
                      }).catch(swal.noop);
                }
                
                const denouncement = data.denouncement
                
                denouncement.evidences = data.evidences.map(e => {
                    e.name = this.fileAndExt(e.resource_url)
                    return e
                })
                
                denouncement.anonymus = denouncement.informer_first_name ? 'Publico' : 'Anónimo'

                this.denouncement = denouncement

                this.form.patchValue({
                    denounces_id: denouncement.id
                })

                this.api.getExternealConversation(denouncement.id_in_hash, conversations => {
                    this.conversations = conversations.map(c => this.conversationMapper(c))
                })
            },
            () => {
                swal({
                    title: 'No se encontro',
                    text: 'Este id de denuncia no coincide con las denuncias de esta empresa',
                    type: 'error'
                  }).catch(swal.noop);
                
                this.processing = false
            }
        )
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
        this.api.postExternalConversation(this.form.value, conversation => {

            this.modalLarge.hide()

            this.form.reset({
                denounces_id: this.denouncement.id,
                external: true
            })

            this.submitted = false
            this.sended = false

            this.denouncement.state = 'replied'

            let cloned = this.conversations.slice()
            cloned.unshift(this.conversationMapper(conversation))

            this.conversations = cloned
        })
    }

    private conversationMapper(conversation) {
        conversation.file_name = this.fileAndExt(conversation.resource_url)

        return conversation
    }

    private fileAndExt(url) {
        if (! url) {
            return null
        }
        
        const matchs = url.match(/\w+\.\w+$/)

        return matchs.length ? matchs[0] : null
    }
}
