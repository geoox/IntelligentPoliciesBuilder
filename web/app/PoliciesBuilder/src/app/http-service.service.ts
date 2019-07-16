import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor() { }

  URL = 'https://in-fit.herokuapp.com/';

  postSignup(postObj) {
    return fetch(this.URL + 'users/signup', {
      method: 'POST', 
      body: JSON.stringify(postObj),
      headers:{
        'Content-Type': 'application/json',
      }
    })
  }
}
