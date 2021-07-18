import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Mega Able 5+';

    constructor(private router: Router, private toastyService: ToastyService) { }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }

    position = 'top-right';

    private addToast(options) {
        if (options.closeOther) {
            this.toastyService.clearAll();
        }

        this.position = options.position ? options.position : this.position;

        const toastOptions: ToastOptions = {
            title: options.title,
            msg: options.msg,
            showClose: options.showClose,
            timeout: 5000,
            theme: options.theme,
            onAdd: (toast: ToastData) => {
                /* added */
            },
            onRemove: (toast: ToastData) => {
                /* removed */
            }
        };

        switch (options.type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }

    notify(options) {
        this.addToast(options)
    }
}
