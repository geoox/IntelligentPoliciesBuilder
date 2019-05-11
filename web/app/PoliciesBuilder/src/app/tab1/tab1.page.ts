import { Component } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  todayDay: any;
  todayMonth: any;

  constructor() {
    this.todayDay = moment().format('dddd');
    this.todayMonth = moment().format('DD MMMM');
  }
}
