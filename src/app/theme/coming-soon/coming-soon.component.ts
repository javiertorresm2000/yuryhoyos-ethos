import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { NgxCarousel } from 'ngx-carousel';

@Component({
    selector: 'app-coming-soon',
    templateUrl: './coming-soon.component.html',
    styleUrls: ['./coming-soon.component.scss', '../../../assets/icon/icofont/css/icofont.scss']
})
export class ComingSoonComponent implements OnInit {

    public email: string = ""
    public password: string = ""

    images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);

    constructor(private api: ApiService, private router: Router) { }

    submit() {
        this.api.login(this.email, this.password, (user) => {

            if (user.rol == -1) {
                this.router.navigate(['dashboard'])
            } else {
                this.router.navigate(['company-dashboard'])
            }

            console.log("LOGGED")
        })
    }

    imgagsBanner: string[];

    public carouselBannerItems: Array<any> = [];
    public carouselBanner: NgxCarousel;

    ngOnInit() {
        this.loadConfig();

        this.api.getSliders(sliders => {
            this.imgagsBanner = sliders.map(s => s.url)
            this.carouselBannerLoad();
        })
    }

    onmoveFn(data) {
        // console.log(data);
    }

    carouselBannerLoadc() {

    }

    funciona(){
        console.log("FUNCIONA")
    }

    public carouselBannerLoad() {
        const len = this.carouselBannerItems.length;
        if (len <= 3) {
            for (let i = len; i < len + this.imgagsBanner.length; i++) {
                this.carouselBannerItems.push(
                    this.imgagsBanner[i]
                );
            }
        }
    }

    private loadConfig() {
        this.carouselBanner = {
            grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
            slide: 1,
            speed: 500,
            interval: 3000,
            point: {
                visible: true,
                pointStyles: `
            .ngxcarouselPoint {
              list-style-type: none;
              text-align: center;
              padding: 12px;
              margin: 0;
              white-space: nowrap;
              overflow: auto;
              position: absolute;
              width: 100%;
              bottom: 20px;
              left: 0;
              box-sizing: border-box;
            }
            .ngxcarouselPoint li {
              display: inline-block;
              border-radius: 999px;
              background: rgba(255, 255, 255, 0.55);
              padding: 5px;
              margin: 0 3px;
              transition: .4s ease all;
            }
            .ngxcarouselPoint li.active {
                background: white;
                width: 10px;
            }
          `
            },
            load: 1,
            custom: 'banner',
            touch: true,
            loop: true,
            easing: 'cubic-bezier(0, 0, 0.2, 1)'
        };
    }

    scroll(el:HTMLElement){
        console.log(el)
        el.scrollIntoView()
    }
}
