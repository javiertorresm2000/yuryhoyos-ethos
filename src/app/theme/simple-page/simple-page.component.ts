import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-page',
  templateUrl: './simple-page.component.html',
  styleUrls: [
  './simple-page.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class SimplePageComponent implements OnInit {
  rowsBasic = []
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ]

  constructor() { }
  
  ngOnInit() {
  	this.rowsBasic = [
  {
    "name": "Ethel Price",
    "gender": "female",
    "company": "My company name is very long and funny because funny is fun",
    "age": 22
  },
  {
    "name": "Claudine Neal",
    "gender": "female",
    "company": "Sealoud",
    "age": 55
  },
  {
    "name": "Beryl Rice",
    "gender": "female",
    "company": "Velity",
    "age": 67
  },
  {
    "name": "Wilder Gonzales",
    "gender": "male",
    "company": "Geekko"
  },
  {
    "name": "Georgina Schultz",
    "gender": "female",
    "company": "Suretech"
  },
  {
    "name": "Carroll Buchanan",
    "gender": "male",
    "company": "Ecosys"
  },
  {
    "name": "Valarie Atkinson",
    "gender": "female",
    "company": "Hopeli"
  },
  {
    "name": "Schroeder Mathews",
    "gender": "male",
    "company": "Polarium"
  },
  {
    "name": "Lynda Mendoza",
    "gender": "female",
    "company": "Dogspa"
  },
  {
    "name": "Stephens Reilly",
    "gender": "male",
    "company": "Acusage"
  }
]

  }

}
