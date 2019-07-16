import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  user_id;

  todayDay: any;
  todayMonth: any;

  loadingWalk = false;
  loadingDistance = false;
  loadingWorkout = false;
  loadingHR = false;
  loadingPoints = false;
  loadingResults = false;

  currentHR;
  lastUpdateHR;

  currentSteps;
  lastUpdateSteps;

  currentDistance;
  lastUpdateDistance;

  currentWorkout;
  lastUpdateWorkout;
  workoutCalories;

  currentPoints;

  constructor() {
    this.todayDay = moment().format('dddd');
    this.todayMonth = moment().format('DD MMMM');
    this.user_id = localStorage.getItem('user_id');
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.loadingDistance = true;
    this.loadingHR = true;
    this.loadingWalk = true;
    this.loadingWorkout = true;
    this.getLatestSteps();
    this.getLatestDistance();
    this.getLatestHR();
    this.getLatestWorkout();
    this.getCurrentPoints();
  }

  onRefresh(event) {
    console.log('refreshing content...');
    this.loadingDistance = true;
    this.loadingHR = true;
    this.loadingPoints = true;
    this.loadingResults = true;
    this.loadingWalk = true;
    this.loadingWorkout = true;
    setTimeout(() => {
      this.loadingDistance = false;
      this.loadingHR = false;
      this.loadingPoints = false;
      this.loadingResults = false;
      this.loadingWalk = false;
      this.loadingWorkout = false;
      console.log('Refresh completed!');
      event.target.complete();
    }, 3000);
  }

  getLatestSteps() {
    fetch('https://in-fit.herokuapp.com/users/' + this.user_id + '/latestSteps')
    .then( (resp) => {
      if (resp.status == 404) {
        this.currentSteps = 'N/A';
      } else {
        resp.json().then( (formattedSteps) => {
          this.currentSteps = formattedSteps.walkStepCount;
          this.lastUpdateSteps = {};
          this.lastUpdateSteps['startTime'] = moment.unix(formattedSteps.startTime).format('MMMM Do, HH:mm');
          this.lastUpdateSteps['endTime'] =  moment.unix(formattedSteps.endTime).format('MMMM Do, HH:mm');
        });
      }
      this.loadingWalk = false;
    })
    .catch( (err) => {
      console.log('GET latestWalk failed', err);
    });
  }

  onWalkCardClicked($event) {
    this.loadingWalk = true;
    this.getLatestSteps();
  }

  getLatestDistance() {
    fetch('https://in-fit.herokuapp.com/users/' + this.user_id + '/latestDistance')
    .then( (resp) => {
      if (resp.status == 404) {
        this.currentDistance = 'N/A';
      } else {
        resp.json().then( (formattedDistance) => {
          this.currentDistance = formattedDistance.distance;
          this.lastUpdateDistance = {};
          this.lastUpdateDistance['startTime'] = moment.unix(formattedDistance.startTime / 1000).format('MMMM Do, HH:mm');
          this.lastUpdateDistance['endTime'] =  moment.unix(formattedDistance.endTime / 1000).format('MMMM Do, HH:mm');
        });
      }

      this.loadingDistance = false;
    })
    .catch( (err) => {
      console.log('GET latestDistance failed', err);
      this.loadingDistance = false;
      this.currentDistance = 'Please try again later';
    });
  }

  onDistanceCardClicked($event) {
    this.loadingDistance = true;
    this.getLatestDistance();
  }

  getLatestWorkout() {
    fetch('https://in-fit.herokuapp.com/users/' + this.user_id + '/latestWorkout')
    .then( (resp) => {
      if (resp.status == 404) {
        this.currentWorkout = 'N/A';
        this.workoutCalories = 'N/A';
      } else {
        resp.json().then( (formattedWorkout) => {
          if (formattedWorkout.error) {
            this.currentWorkout = 'N/A';
            this.workoutCalories = 'N/A';
          } else {
            this.currentWorkout = formattedWorkout.runStepCount;
            this.workoutCalories = formattedWorkout.calories;
            this.lastUpdateWorkout = {};
            this.lastUpdateWorkout['startTime'] = moment.unix(formattedWorkout.startTime / 1000).format('MMMM Do, HH:mm');
            this.lastUpdateWorkout['endTime'] =  moment.unix(formattedWorkout.endTime / 1000).format('MMMM Do, HH:mm');
          }
        });
      }

      this.loadingWorkout = false;
    })
    .catch( (err) => {
      console.log('GET latestWorkout failed', err);
      this.loadingWorkout = false;
    });
  }

  onWorkoutCardClicked($event) {
    this.loadingWorkout = true;
    this.getLatestWorkout();
  }

  getLatestHR() {
    fetch('https://in-fit.herokuapp.com/users/' + this.user_id + '/latestHR')
    .then( (resp) => {
        resp.json().then( (formattedHR) => {
            this.currentHR = formattedHR.heartRate;
            this.lastUpdateHR = moment.unix((formattedHR.date / 1000)).format('MMMM Do, HH:mm');  
        });
      this.loadingHR = false;
    })
    .catch( (err) => {
      console.log('GET latestHR failed', err);
      this.loadingHR = false;
    });
  }

  onHRCardClicked($event) {
    console.log('HR card clicked!');
    this.loadingHR = true;
    this.getLatestHR();
  }

  getCurrentPoints() {
    fetch('https://in-fit.herokuapp.com/users/' + this.user_id + '/currentPoints')
    .then( (resp) => {
      if (resp.status == 404) {
        this.currentPoints = 'N/A';
      } else {
        resp.json().then( (pointsResp) => {
          this.currentPoints = Math.round(pointsResp);
        });
      }

      this.loadingPoints = false;
    })
    .catch( (err) => {
      console.log('GET current points failed', err);
      this.loadingPoints = false;
    });
  }

  onPointsCardClicked($event) {
    this.loadingPoints = true;
    this.getCurrentPoints();
  }

  onResultsCardClicked($event) {
    this.loadingResults = true;

    setTimeout(() => {
        this.loadingResults = false;
    }, 5000);
  }
}
