import React, { Component } from "react";
import { Doughnut, Line, Bar } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          "Excellent",
          "Above average",
          "Average",
          "Below average",
          "Poor"
        ],
        datasets: [
          {
            label: "Your Entries!",
            data: [
              2000,
              3000,
              1000,
              300,
              2000,
            ]
          }

        ]
      }
    }
  }

  render() {
    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          options={{  }}
        />
      </div>
    )
  }
}

export default Chart;