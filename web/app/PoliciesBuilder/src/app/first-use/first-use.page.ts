import { Component, OnInit } from '@angular/core';

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

  userName;

  constructor() { }

  ngOnInit() {
  }

  onNameChange(event): void{
    console.log(event.target.value);
    this.userName = event.target.value;
  }

  // onGenderChange()

}
