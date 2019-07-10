import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core'; 
import { Slides, NavController } from 'ionic-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  @ViewChild('slides') slides: Slides;
  isLastPagePromise;
  isLastPage = false;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private router: Router) { }

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

  onLoginClicked() {
    console.log('login clicked')
  }

  onRegisterClicked() {
    this.router.navigateByUrl('/register');
  }

}
