import { ViewChild , Component, OnInit, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/user';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-company-details',
    templateUrl: './company-details.component.html',
    //changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

    @ViewChild('myInput')
    myInputVariable: ElementRef;

    public uploader: FileUploader;
    public editor;
    public editorContent;
    public editorConfig;

    public company: any = {}
    public name = ""

    constructor(private api: ApiService, private appComponent: AppComponent) {
        this.uploader = new FileUploader({
            url: api._host() + 'upload',
            isHTML5: true
        });

        this.editorConfig = this.getEditorToolbarConfig();
    }

    ngOnInit() {
        this.api.getCompany(User.getUser().company_id, company => {
            console.log(company)
            this.company = company
            this.name = company.name
            this.editorContent = company.description
        })

        setTimeout(() => {
            this.editorContent = this.editorContent;
            console.log('you can use the quill instance object to do something', this.editor);
            // this.editor.disable();
        }, 2800);
    }

    upload() {
        console.log(this.uploader.queue)
        const body: any = {
            name: this.name
        }

        if (this.uploader.queue.length) {
            const file = this.uploader.queue[0]
            
            if ((file.file.size/1024) < 1024) {
                file.onSuccess = (response: string, status: number, headers: any) => {
                    body.logo = response
                    console.log(body.logo)
                    this.api.putCompany(User.getUser().company_id, body, response => {
                        this.company.logo = body.logo
    
                        this.removeAll()
                    })
                }
                file.upload()
            } else {
                this.appComponent.notify({
                    title: 'Información invalida',
                    msg: 'Ha superado el peso máximo permitido en el logo',
                    type: 'warning'
                  });
            }
            
            
        } else {
            this.api.putCompany(User.getUser().company_id, body, response => {
                
            })
        }
    }


    removeAll() {
        this.uploader.clearQueue()

        this.myInputVariable.nativeElement.value = "";
    }

    onEditorBlured(quill) {
        //console.log('editor blur!', quill);
    }

    onEditorFocused(quill) {
        //console.log('editor focus!', quill);
    }

    onEditorCreated(quill) {
        this.editor = quill;
        //console.log('quill is ready! this is current quill instance object', quill);
    }


    onContentChanged({ quill, html, text }) {
        //console.log('quill content is changed!', quill, html, text);
        //this.content = html
    }

    saveMessage() {

        const body = {
            description: this.editorContent
        }

        //this.uploader.queue[0].upload()
        this.api.putCompany(User.getUser().company_id, body, response => {

        })

        console.log(this.editorContent)
    }

    private getEditorToolbarConfig() {
        return {
            placeholder: '',
            modules: {
                toolbar: {
                    container: [
                        ["bold", "italic", "underline", "strike"],
                        //["blockquote", "code-block"],
                        //[{ "header": 1 }, { "header": 2 }],
                        [{ "list": "ordered" }, { "list": "bullet" }],
                        //[{ "script": "sub" }, { "script": "super" }],
                        //[{ "indent": "-1" }, { "indent": "+1" }],
                        //[{ "direction": "rtl" }],
                        //[{ "size": ["small", false, "large", "huge"] }],
                        [{ "header": [1, 2, 3, 4, 5, 6, false] }],
                        //[{ "color": [] }, { "background": [] }],
                        //[{ "font": [] }],
                        //[{ "align": [] }],
                        //["clean"],
                        ["link"]
                    ]
                }
            }
        }
    }
}
