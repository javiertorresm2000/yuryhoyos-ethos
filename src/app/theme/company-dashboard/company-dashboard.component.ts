import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/user';

@Component({
    selector: 'app-company-dashboard',
    templateUrl: './company-dashboard.component.html',
    styleUrls: []
})
export class CompanyDashboardComponent implements OnInit {

    public total = 0;
    public closed = 0;
    public open = 0;
    public investigators = 0;
    public categories: Array<any> = []
    public denouncements: Array<any> = []

    me_assigned = 0
    me_closed = 0

    public rol: number = User.ROL_INVESTIGATOR;

    public ROL_INVESTIGATOR = User.ROL_INVESTIGATOR;
    
    public COLORS = [
        'blue',
        'green',
        'red',
        'yellow',
        'purple',
    ]

    constructor(private api: ApiService) {
        this.rol = User.getRol()

        api.getDashboard(data => {
            this.total = data.totalDenouncements
            this.closed = data.totalDenouncementsClosed
            this.open = data.totalDenouncementsCreated
            this.investigators = data.activeInvestigators
            this.me_assigned = data.meAssigned
            this.me_closed = data.meClosed

            this.denouncements = data.lastDenouncements.map(d => {
                d.label_type = (d.first_name) ? 'primary' : 'info-border'
                d.type = (d.first_name) ? 'Público' : 'Anónimo'

                return d
            })

            this.categories = data.topCategoryDenouncements.map((c, i) => {
                return {
                    name: c.name,
                    percentage: ~~(Number(c.total)/Number(this.total)*100),
                    color: this.COLORS[i]
                }
            }).sort((a, b) => (a.percentage < b.percentage) ? 1 : -1)
        })
    }

    ngOnInit() {
    }

}
