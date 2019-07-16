import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.page.html',
  styleUrls: ['./insurance-details.page.scss'],
})
export class InsuranceDetailsPage implements OnInit {

  constructor() { 
    this.user_id = localStorage.getItem('user_id');
    this.getUser();
  }

  ngOnInit() {
  }

  loading;
  user_id;
  subscriptionFee;
  startDate;
  endDate;

  getUser(){
    this.loading = true;
    fetch('https://in-fit.herokuapp.com/users/' + this.user_id)
    .then( (resp) => {
      resp.json().then( (userInfo) => {
        this.subscriptionFee = userInfo.insurancePlan.monthlyFee;
        this.startDate = moment(userInfo.insurancePlan.tsStart).format("DD/MM/YYYY");
        this.endDate = moment(userInfo.insurancePlan.tsEnd).format("DD/MM/YYYY");
        this.loading = false;
      });
    })
    .catch( (err) => {
      console.log('GET user failed', err);
      this.loading = false;
    });
  }

}
