import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { LoaderServiceService } from '../loader-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private loader: LoaderServiceService) { }

  user: string;
  password: string;

  onRegisterClicked() {

    const postObj = {
      'email': this.user,
      'password': this.password
    }

    fetch('https://in-fit.herokuapp.com/users/signup', {
      method: 'POST', 
      body: JSON.stringify(postObj),
      headers:{
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      console.log('Success:', JSON.stringify(response));
      this.loader.present();
      this.router.navigateByUrl('/');
      this.loader.dismiss();
    })
    .catch(error => console.error('Error:', error));
  }

  onUserChanged(event) {
    // console.log('user changed', event.target.value);
    this.user = event.target.value;
  }

  onPasswordChanged(event) {
    // console.log('pw changed', event.target.value);
    this.password = event.target.value;
  }

  ngOnInit() {
  }

}
