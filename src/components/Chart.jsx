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
    return (
      <div>
        <div className="chart">
          <Doughnut
            data={{
              labels: [
                `Excellent ${excellent}`,
                `Above average ${aboveAv}`,
                `Average ${av}`,
                `Below average ${belowAv}`,
                `Poor ${poor}`
              ],
              datasets: [
                {
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
                    'yellow'
                  ]
                }
              ]
            }}
            options={{ 
              title:{
                display: true,
                text: 'Your results by class',
                fontSize: 20
              },
              legend:{
                display: true,
                position: 'right'
              }
            }}
          />
        </div>
      </div>
    )
  }
}

export default Chart;