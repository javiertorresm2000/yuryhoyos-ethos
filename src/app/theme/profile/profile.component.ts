import { ViewChild , Component, OnInit, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/user';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    @ViewChild('myInput')
    myInputVariable: ElementRef;

    public uploader: FileUploader;
    public editor;
    public editorContent;
    public editorConfig;

    public company: any = {}
    public name = ""

    public first_name = ""
    public last_name = ""
    public photo = ""

    public password = "";
    public new_password = ""

    constructor(private api: ApiService, private appComponent: AppComponent) {
        this.uploader = new FileUploader({
            url: api._host() + 'upload',
            isHTML5: true
        });
    }

    ngOnInit() {
        this.api.getProfile(profile => {
            console.log(profile)
            this.first_name = profile.first_name
            this.last_name = profile.last_name
            this.photo = profile.photo
        })
    }

    upload() {
        console.log(this.uploader.queue)
        const body: any = {
            first_name: this.first_name,
            last_name: this.last_name,
            photo: this.photo
        }

        if (this.uploader.queue.length) {
            const file = this.uploader.queue[0]
            
            if ((file.file.size/1024) < 1024) {
                file.onSuccess = (response: string, status: number, headers: any) => {
                    body.photo = response

                    this.api.putProfile(User.getUser().company_id, body, response => {
                        localStorage.setItem('user', JSON.stringify(response));

                        this.photo = body.photo
    
                        this.removeAll()

                        setTimeout(()=>{
                            window.location.reload();
                        }, 2000)
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
            this.api.putProfile(User.getUser().id, body, response => {
                localStorage.setItem('user', JSON.stringify(response));
                setTimeout(()=>{
                    window.location.reload();
                }, 2000)
            })
        }
    }

    removeAll() {
        this.uploader.clearQueue()

        this.myInputVariable.nativeElement.value = "";
    }


   

    saveMessage() {
        if (this.api._utf8_to_b64(User.getUser().email+ ':'+ this.password) != localStorage.getItem('token')) {
            this.appComponent.notify({
                title: 'Acceso denegado',
                msg: 'Credenciales incorrectas',
                type: 'warning'
              });
            return;
        }
        const body: any = {
            password: this.new_password
        }

        this.api.putProfile(User.getUser().id, body, response => {
            localStorage.setItem('token', this.api._utf8_to_b64(User.getUser().email+ ':'+ this.new_password));
            localStorage.setItem('user', JSON.stringify(response));
        })
    }
}
