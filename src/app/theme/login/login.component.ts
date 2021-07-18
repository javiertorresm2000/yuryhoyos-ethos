import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = ""
  public password: string = ""

  constructor(private api: ApiService, private router: Router) { }

  submit() {
    console.log("LLEGA")
    this.api.login(this.email, this.password, (user) => {

        if (user.rol == -1) {
            this.router.navigate(['dashboard'])
        } else {
            this.router.navigate(['company-dashboard'])
        }

        console.log("LOGGED")
    })
  }

  ngOnInit() {
  }

}
