import React, { Component } from 'react';
import { getData } from "../modules/performanceData";

class DisplayPerformanceData extends Component {
  state = {
    performanceData: null
  }

  componentDidMount() {
    this.getPerformanceData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.updateIndex !== prevProps.updateIndex) {
      this.getPerformanceData()
    }
  }

  async getPerformanceData() {
    let result = await getData();
    this.setState({performanceData: result.data.entries}, () => {
      this.props.indexUpdated();
      debugger
    })
  }

  render () {
    let dataIndex;

    if (this.state.performanceData != null) {
      dataIndex = (
        <div>
          {this.state.performanceData.map(item => {
            let date = item.created_at
            date = date.substring(0, date.indexOf("T"));
            return <div className="entry" key={item.id}>
              <h4>Entry: {date}</h4>
              <p id="entryDetails"> 
                Age: {item.data.age} yrs -
                Distance: {item.data.distance} m -
                Cooper Test Grade: {item.data.message} 
              </p>
            </div>
          })}
        </div>
      )
    }

    return (
      <div id='index' className="performance">
        {dataIndex}
      </div>
    )
  }      
}

export default DisplayPerformanceData