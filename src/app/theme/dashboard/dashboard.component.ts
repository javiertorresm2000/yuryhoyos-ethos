import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public newUserData: any;
    public newUserOption: any;

    public totalCompanies: number = 0;
    public enabledCompanies: number = 0;
    public disabledCompanies: number = 0;

    public totalDenouncements: number = 0;
    public totalDenouncementsClosed: number = 0;
    public totalDenouncementsCreated: number = 0;

  constructor(private api: ApiService) { 

    api.getDashboard(data => {
        this.totalCompanies = data.totalCompanies
        this.enabledCompanies = data.activeCompanies
        this.disabledCompanies = data.totalCompanies - data.activeCompanies
        this.totalDenouncements = data.totalDenouncements
        this.totalDenouncementsClosed = data.totalDenouncementsClosed
        this.totalDenouncementsCreated = data.totalDenouncementsCreated
        
        const topCompaniesDenouncements = data.topCompaniesDenouncements

        const COLORS = ['#11c15b', '#448aff', '#ff5252', '#ffe100', '#536dfe']

        const dataSet = topCompaniesDenouncements.map(c => c.total)
        const backgraounds = topCompaniesDenouncements.map((c, i) => COLORS[i])
        
        this.newUserData = {
            datasets: [{
              data: dataSet,
              backgroundColor: backgraounds,
              label: 'Dataset 1'
            }],
            labels: topCompaniesDenouncements.map(c => c.name)
          };
    })
      
      
      this.newUserOption = {
        responsive: true,
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: '',
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      };

  }

  ngOnInit() {
  }

}
