import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  constructor() {
    this.user_id = localStorage.getItem('user_id');
  }

  ngOnInit() {
    this.getUser();
  }

  loading;

  user_id;
  name;
  userName;
  age;
  height;
  weight;
  gender;
  birthdate;

  getUser(){
    this.loading = true;
    fetch('https://in-fit.herokuapp.com/users/' + this.user_id)
    .then( (resp) => {
      resp.json().then( (userInfo) => {
        this.name = userInfo.name;
        this.userName = userInfo.email;
        this.age = moment().diff(userInfo.birthDate, 'years');
        this.height = userInfo.height;
        this.weight = userInfo.weight;
        this.gender = userInfo.gender;
        this.birthdate = moment(userInfo.birthDate).format("DD/MM/YYYY");
        this.loading = false;
      });
    })
    .catch( (err) => {
      console.log('GET user failed', err);
      this.loading = false;
    });
  }

}
