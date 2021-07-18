import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: []
})
export class RestorePasswordComponent implements OnInit {

  constructor(private api: ApiService, private appComponent: AppComponent) {

  }

  ngOnInit() {
  }

  public email = ""

  reset() {
    this.api.postRestorePassword({ email: this.email },data => {
      this.email = ""
    })
  }
}
