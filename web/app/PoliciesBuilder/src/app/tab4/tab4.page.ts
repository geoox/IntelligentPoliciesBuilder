import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { Router } from '../../../node_modules/@angular/router';
import { ModalController } from '../../../node_modules/@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public router: Router, public modalController: ModalController) { }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.getUser();
  }

  user_id;

  userName;
  age;
  height;
  weight;
  gender;
  insurancePlan;

  getUser(){
    fetch('https://in-fit.herokuapp.com/users/' + this.user_id)
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

  onLogoutTapped() {
    this.router.navigateByUrl('/');
  }

  async onUserDetailsTapped() {
    this.router.navigateByUrl('/user/profile/user-details');
  }

  onInsuranceDetailsTapped() {
    this.router.navigateByUrl('/user/profile/insurance-details');
  }

  onFAQTapped() {
    this.router.navigateByUrl('/user/profile/faq');
  }

  onWearableTapped() {
    this.router.navigateByUrl('/user/profile/pair-watch');
  }

}
