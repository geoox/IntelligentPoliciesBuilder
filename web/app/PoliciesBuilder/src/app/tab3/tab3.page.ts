import { Component } from '@angular/core';
import * as Chart from "chart.js";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: '2',
    centeredSlides: true,
    spaceBetween: 30
  };

  totalPoints;
  loadingTotalPoints;

  totalSteps;
  loadingTotalSteps;

  totalDistance;
  loadingTotalDistance;

  totalCalories;

  totalRunningSteps;

  averageHR;
  loadingHR;

  last10HR;
  last5Steps;

  constructor(){
    
  }

  ngOnInit(){
    this.renderBudgetChart();


    this.getAverageHR();
    this.getTotalDistance();
    this.getTotalPoints();
    this.getTotalSteps();
    this.getLast5Steps();
  }

  getTotalPoints(){
    this.loadingTotalPoints = true;
    fetch('https://floating-sea-64607.herokuapp.com/users/5cd9cafcb0903000049da772/totalPoints')
    .then( (resp) => {
      resp.json().then( (totalPoints) => {
        this.totalPoints = totalPoints.totalPoints;
      });
      this.loadingTotalPoints = false;
    })
    .catch( (err) => {
      console.log('GET totalPoints failed', err);
    });
  }

  getTotalSteps(){
    this.loadingTotalSteps = true;
    fetch('https://floating-sea-64607.herokuapp.com/users/5cd9cafcb0903000049da772/totalSteps')
    .then( (resp) => {
      resp.json().then( (stepsResp) => {
        this.totalSteps = stepsResp.totalSteps;
        this.totalCalories = stepsResp.calories;
        this.totalRunningSteps = stepsResp.totalRunningSteps;
      });
      this.loadingTotalSteps = false;
    })
    .catch( (err) => {
      console.log('GET totalSteps failed', err);
    });
  }

  getTotalDistance(){
    this.loadingTotalDistance = true;
    fetch('https://floating-sea-64607.herokuapp.com/users/5cd9cafcb0903000049da772/totalDistance')
    .then( (resp) => {
      resp.json().then( (totalDistance) => {
        this.totalDistance = totalDistance.totalDistance;
      });
      this.loadingTotalDistance = false;
    })
    .catch( (err) => {
      console.log('GET totalDistance failed', err);
    });
  }

  getLast5Steps(){
    fetch('https://floating-sea-64607.herokuapp.com/users/5cd9cafcb0903000049da772/last5Steps')
    .then( (resp) => {
      resp.json().then( (res) => {
        this.last5Steps = res.reverse();
        this.renderWeeklyChart();
      });
    })
    .catch( (err) => {
      console.log('GET last5Steps failed', err);
    });
  }

  getAverageHR(){
    this.loadingHR = true;
    fetch('https://floating-sea-64607.herokuapp.com/users/5cd9cafcb0903000049da772/last10HR')
    .then( (resp) => {
      resp.json().then( (heartRates) => {
        let heartRatesArr = [];
        heartRates.forEach(element => {
          if (element.heartRate > 30){
            heartRatesArr.push(element.heartRate);
          }
        });
        this.averageHR = (heartRatesArr.reduce((a,b)=>a+b, 0) / heartRatesArr.length).toFixed(2);
        this.last10HR = heartRatesArr.reverse();
        this.renderHRChart();
      });
      this.loadingHR = false;
    })
    .catch( (err) => {
      console.log('GET totalDistance failed', err);
    });
  }


  renderHRChart(){
    var ctx = (<HTMLCanvasElement> document.getElementById('HRChart')).getContext("2d");

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#ff7f4f");
    gradientStroke.addColorStop(1, "#c92f00");

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["HR 1", "HR 2", "HR 3", "HR 4", "HR 5", "HR 6", "HR 7", "HR 8", "HR 9", "HR 10", ""],
            datasets: [{
                label: "HR - last recordings",
                borderColor: gradientStroke,
                pointBorderColor: gradientStroke,
                pointBackgroundColor: gradientStroke,
                pointHoverBackgroundColor: gradientStroke,
                pointHoverBorderColor: gradientStroke,
                pointStyle: 'rect',
                pointBorderWidth: 8,
                pointHoverRadius: 12,
                pointHoverBorderWidth: 3,
                pointRadius: 5,
                fill: false,
                borderWidth: 2,
                data: this.last10HR
            }]
        },
        options: {
            animation: {
                easing: "easeInOutBack"
            },
            legend: {
                position: "top"
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        zeroLineColor: "transparent",
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                }]
            }
        }
    });
  }

  renderWeeklyChart(){
    var ctx = (<HTMLCanvasElement> document.getElementById('weeklyActivityChart')).getContext("2d");

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#373B44");
    gradientStroke.addColorStop(1, "#4286f4");

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", ""],
            datasets: [{
                label: "Steps - last 5 days",
                borderColor: gradientStroke,
                pointBorderColor: gradientStroke,
                pointBackgroundColor: gradientStroke,
                pointHoverBackgroundColor: gradientStroke,
                pointHoverBorderColor: gradientStroke,
                pointBorderWidth: 12,
                pointHoverRadius: 12,
                pointHoverBorderWidth: 3,
                pointRadius: 3,
                fill: false,
                borderWidth: 2,
                data: this.last5Steps
            }]
        },
        options: {
            animation: {
                easing: "easeInOutBack"
            },
            legend: {
                position: "top"
            },
            scales: {
                yAxes: [

                ],
                xAxes: [{
                    gridLines: {
                        zeroLineColor: "transparent",
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                }]
            }
        }
    });
  }

  renderBudgetChart() {
    var ctx = (<HTMLCanvasElement> document.getElementById('budgetChart')).getContext("2d");
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Month 1", "Month 2", "Month 3", "Month 4"],
        datasets: [{
            label: "Projected expenditure",
            type: "line",
            borderColor: "#8e5ea2",
            data: [150,300,450,600],
            fill: false,
            pointBorderWidth: 12,
            pointHoverRadius: 12,
            pointHoverBorderWidth: 3,
            pointRadius: 3
          }, {
            label: "Projected saving",
            type: "line",
            borderColor: "#3e95cd",
            data: [150,230,320,400],
            fill: false,
            pointBorderWidth: 12,
            pointHoverRadius: 12,
            pointHoverBorderWidth: 3,
            pointRadius: 3
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Budget expenses'
        },
        legend: { display: true },
        scales: {
          yAxes: [{
              ticks: {
                  display: false
              },
              gridLines: {
                  drawTicks: false,
                  display: false
              }

          }],
          xAxes: [{
              gridLines: {
                drawTicks: false,
                display: false
              },
              ticks: {
                  padding: 20,
                  fontColor: "rgba(0,0,0,0.5)",
                  fontStyle: "bold"
              }
          }]
      }
      }
  });
  }
}
