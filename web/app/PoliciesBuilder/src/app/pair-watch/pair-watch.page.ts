import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pair-watch',
  templateUrl: './pair-watch.page.html',
  styleUrls: ['./pair-watch.page.scss'],
})
export class PairWatchPage implements OnInit {

  constructor() {
    this.user_id = localStorage.getItem('user_id');
    this.getPinCode();
   }

  ngOnInit() {
  }

  pinWatch;
  user_id;

  getPinCode() {
    fetch('https://in-fit.herokuapp.com/users/' + this.user_id + '/watchPin')
    .then( (resp) => {
        resp.json().then( (pin) => {
          this.pinWatch = pin;
        });
    })
    .catch( (err) => {
      console.log('GET watch pin failed', err);
    });
  }

}
