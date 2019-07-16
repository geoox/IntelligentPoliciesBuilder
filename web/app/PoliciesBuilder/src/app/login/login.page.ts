import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core'; 
import { Slides, NavController } from 'ionic-angular';
import { Router } from '@angular/router';
import { AlertServiceService } from '../alert-service.service';
import { LoaderServiceService } from '../loader-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  @ViewChild('slides') slides: Slides;
  isLastPagePromise;
  isLastPage = false;
  user: string;
  password: string;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private router: Router, private alert: AlertServiceService, private loader: LoaderServiceService) { }

  ngOnInit() {
  }

  onNextClicked() {
    console.log('next clicked');
    this.slides.slideNext();
  }

  onSwipe() {
    this.isLastPagePromise = this.slides.isEnd();
    this.isLastPagePromise.then(res => {
      this.isLastPage = res;
    })
  }

  async onLoginClicked() {

    this.loader.present();

    const postObj = {
      'email': this.user,
      'password': this.password
    }

    console.log(postObj);
    fetch('https://in-fit.herokuapp.com/users/signin', {
      method: 'POST', 
      body: JSON.stringify(postObj),
      headers:{
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(response => {
      this.loader.dismiss();
      if (!response.error && !response.failed) {
        console.log('Success:', response);
        localStorage.setItem('user_id', response.user_id);
        fetch('https://in-fit.herokuapp.com/users/' + response.user_id)
        .then(resp => resp.json())
        .then( user => {
          console.log('fetched user', user);
          this.user = '';
          this.password = '';
          if (user['birthDate']) {
            this.router.navigateByUrl('/user');
          } else {
            this.router.navigateByUrl('/first-use');
          }
        });
      } else {
        this.alert.presentAlert();
      }

    })
    .catch(error => {
      console.error('Error:', error);
      this.loader.dismiss();
    }
    );
  }

  onUserChanged(event) {
    // console.log('user changed', event.target.value);
    this.user = event.target.value;
  }

  onPasswordChanged(event) {
    // console.log('pw changed', event.target.value);
    this.password = event.target.value;
  }

  onRegisterClicked() {
    this.router.navigateByUrl('/register');
  }

}
