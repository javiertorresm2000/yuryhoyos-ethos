import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('user')) {
            return true;
        }

        this.router.navigate(['start']);
        return false;
    }
}
