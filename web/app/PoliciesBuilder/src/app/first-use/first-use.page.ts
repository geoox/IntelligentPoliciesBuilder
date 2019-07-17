import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LoaderServiceService } from '../loader-service.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-first-use',
  templateUrl: './first-use.page.html',
  styleUrls: ['./first-use.page.scss'],
})
export class FirstUsePage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  user_id;

  userName;
  gender;
  birthdate;
  height;
  weight;
  subscriptionCost;
  startDate;
  endDate;


  constructor(private loader: LoaderServiceService, public router: Router) { }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
  }

  onNameChange(event): void {
    console.log(event.target.value);
    this.userName = event.target.value;
  }

  onGenderChange(event): void {
    this.gender = event.detail.value;
    console.log(this.gender);
  }

  onBirthdayChange(event): void {
    this.birthdate = moment(event.detail.value).format();
    console.log(this.birthdate);
  }

  onHeightChange(event): void {
    console.log(event.target.value);
    this.height = event.target.value;
  }

  onWeightChange(event): void {
    console.log(event.target.value);
    this.weight = event.target.value;
  }

  onSubscriptionChange(event): void {
    console.log(event.target.value);
    this.subscriptionCost = event.target.value;
  }

  onStartChange(event): void {
    console.log(event.target.value);
    this.startDate = event.target.value;
  }

  onEndChange(event): void {
    console.log(event.target.value);
    this.endDate = event.target.value;
  }

  onReadyPressed(): void {

    this.loader.present();

    console.log('ready pressed');
    const nameObj = {
      'propName': 'name',
      'value': this.userName
    }
    const genderObj = {
      'propName': 'gender',
      'value': this.gender
    }
    const birthDateObj = {
      'propName': 'birthDate',
      'value': this.birthdate
    }
    const heightObj = {
      'propName': 'height',
      'value': this.height
    }
    const weightObj = {
      'propName': 'weight',
      'value': this.weight
    }
    const insuranceObj = {
      'propName': 'insurancePlan',
      'value': {
        'monthlyFee': this.subscriptionCost,
        'tsStart': this.startDate,
        'tsEnd': this.endDate
      }
    }
    const pinObj = {
      'propName': 'watchPin',
      'value': Math.random().toString().substr(2,4)
    }
    const postArr = [nameObj,genderObj,birthDateObj,heightObj,weightObj,insuranceObj,pinObj];

    console.log(postArr);
    fetch('https://in-fit.herokuapp.com/users/' + this.user_id, {
      method: 'PATCH', 
      body: JSON.stringify(postArr),
      headers:{
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(result => {
      console.log('result', result);
      this.loader.dismiss();
      this.router.navigateByUrl('/user');
    })
    .catch(err => {
      console.log(err);
      this.loader.dismiss();
    })
  }


}
