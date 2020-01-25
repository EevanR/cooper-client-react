import React, { Component } from "react";
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { getData } from "../modules/performanceData";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      performanceData: null,
      excellent: null,
      aboveAv: null,
      av: null,
      belowAv: null,
      poor: null,
    } 
  }

  componentDidMount() {
    this.getPerformanceData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getPerformanceData();
    }
  }

  async getPerformanceData() {
    let list = await getData();
    let array = list.data.entries.map(item => 
      item.data.message)
    let excellent = array.filter(x => x === 'Excellent').length
    let aboveAv = array.filter(x => x === 'Above average').length
    let av = array.filter(x => x === 'Average').length
    let belowAv = array.filter(x => x === 'Below average').length
    let poor = array.filter(x => x === 'Poor').length
    
    let distanceArray = list.data.entries.map(item => 
      item.data.distance)
    let dateArray = list.data.entries.map(item => 
      item.created_at.substring(0, item.created_at.indexOf("T")))

    this.setState({
      performanceData: list.data.entries,
      excellent: excellent,
      aboveAv: aboveAv,
      av: av,
      belowAv: belowAv,
      poor: poor,
      distance: distanceArray,
      date: dateArray
    });
  }

  render() {
    const { excellent, aboveAv, av, belowAv, poor, distance, date } = this.state
    const data = 
      {labels: [
        `Excellent: ${excellent} Runs`,
        `Above average: ${aboveAv} Runs`,
        `Average: ${av} Runs`,
        `Below average: ${belowAv} Runs`,
        `Poor: ${poor} Runs`
      ],
      datasets: [{
          label: "Your Entries!",
          data: [
            excellent,
            aboveAv,
            av,
            belowAv,
            poor
          ],
          backgroundColor: [
            'rgb(255,102,102)',
            'rgb(77,255,77)',
            'rgb(102,204,255)',
            'rgb(255,140,25)',
            'yellow',
          ]
        }
      ]}

    const options = {
      legend: {
        position: 'left',
        labels: {
          fontColor: "white",
          fontSize: 14
        }
      }
    }

    const lineData = {
      labels: date,
      datasets: [
        {
          label: 'Entries',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointRadius: 4,
          data: distance
        }
      ]
    };

    const lineOptions = {
      legend: {
        labels: {
          fontColor: "white"
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "white"
          }
        }],
        xAxes: [{
          ticks: {
              fontColor: "white",
              fontSize: 14,
          }
        }]
      }
    }
    
    return (
        <div id="divider" className="chartBLock">
          <div className="chart1">
            <h3>Overall Stats</h3>
            <Doughnut  
              data = {data} 
              options = {options}
            />
          </div>
          <div className="chart2">
            <h3>Daily Performance</h3>
            <Line 
              data = {lineData}
              options = {lineOptions}
            />
          </div>
      </div>
    )
  }
}

export default Chart;