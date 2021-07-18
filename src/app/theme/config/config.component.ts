import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: []
})
export class ConfigComponent {

  public form: FormGroup;

  constructor(public formBuilder: FormBuilder, private api: ApiService) {
    this.form = this.formBuilder.group({
      restore_email_name: '',
      restore_email_address: ['', [Validators.required, Validators.email]],
      restore_email_password: '',
      notification_email_name: '',
      notification_email_address: ['', [Validators.required, Validators.email]],
      notification_email_password: ''
    });

    

    this.api.getSettings(settings => {
      const setting = {}

      const settingsMapped = settings.map(element => {        
        setting[element.key] = element.value
      })

      this.form.patchValue(setting)
    })
  }

  save() {

    this.api.postSettings({ settings: this.form.value }, data => {

    })
  }

}
