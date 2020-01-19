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

    this.setState({
      performanceData: list.data.entries,
      excellent: excellent,
      aboveAv: aboveAv,
      av: av,
      belowAv: belowAv,
      poor: poor
    });
  }

  render() {
    const { excellent, aboveAv, av, belowAv, poor } = this.state
    const data = 
      {labels: [
        `Excellent ${excellent}: Runs`,
        `Above average ${aboveAv}: Runs`,
        `Average ${av}: Runs`,
        `Below average ${belowAv}: Runs`,
        `Poor ${poor}: Runs`
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
            'red',
            'green',
            'blue',
            'orange',
            'yellow',
          ]
        }
      ]}

    const options = {
      legend: {
        labels: {
          fontColor: "white"
        }
      }
    }

    const lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointRadius: 4,
          data: [65, 59, 80, 81, 56, 55, 40]
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
            <h3>Graph 1</h3>
            <Doughnut  
              data = {data} 
              options = {options}
            />
          </div>
          <div className="chart2">
            <h3>Graph 2</h3>
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