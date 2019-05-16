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

  constructor(){
    
  }

  ngOnInit(){
    this.renderWeeklyChart();
    this.renderBudgetChart();

    this.getAverageHR();
    this.getTotalDistance();
    this.getTotalPoints();
    this.getTotalSteps();
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

  getAverageHR(){
    this.loadingHR = true;
    fetch('https://floating-sea-64607.herokuapp.com/users/5cd9cafcb0903000049da772/last10HR')
    .then( (resp) => {
      resp.json().then( (heartRates) => {
        let heartRatesArr = [];
        heartRates.forEach(element => {
          heartRatesArr.push(element.heartRate);
        });
        this.averageHR = heartRatesArr.reduce((a,b)=>a+b, 0) / heartRatesArr.length;
      });
      this.loadingHR = false;
    })
    .catch( (err) => {
      console.log('GET totalDistance failed', err);
    });
  }

  renderWeeklyChart(){
    var ctx = (<HTMLCanvasElement> document.getElementById('weeklyActivityChart')).getContext("2d");

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#373B44");
    gradientStroke.addColorStop(1, "#4286f4");

    var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
    gradientFill.addColorStop(0, "#ffffff");
    gradientFill.addColorStop(0.5, "#0b8793");
    gradientFill.addColorStop(1, "#360033");

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            datasets: [{
                label: "Weekly Activity Level",
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
                backgroundColor: gradientFill,
                borderWidth: 2,
                data: [100, 120, 150, 170, 180, 170, 160]
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
                        zeroLineColor: "transparent"
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
            data: [125,250,375,500],
            fill: false,
            pointBorderWidth: 12,
            pointHoverRadius: 12,
            pointHoverBorderWidth: 3,
            pointRadius: 3
          }, {
            label: "Projected saving",
            type: "line",
            borderColor: "#3e95cd",
            data: [125,230,320,400],
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
