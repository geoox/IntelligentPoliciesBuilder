import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getUser();
  }

  userName;
  age;
  height;
  weight;
  gender;
  insurancePlan;

  getUser(){
    fetch('https://floating-sea-64607.herokuapp.com/users/5cd9cafcb0903000049da772/')
    .then( (resp) => {
      resp.json().then( (userInfo) => {
        this.userName = userInfo.name;
        this.age = moment().diff(userInfo.birthDate, 'years');
        this.height = userInfo.height;
        this.weight = userInfo.weight;
        this.gender = userInfo.gender;
        this.insurancePlan = userInfo.insurancePlan;
      });
    })
    .catch( (err) => {
      console.log('GET user failed', err);
    });
  }

}
