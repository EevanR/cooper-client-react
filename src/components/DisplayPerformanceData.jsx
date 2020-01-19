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
    })
  }

  render () {
    let dataIndex;

    if (this.state.performanceData != null) {
      dataIndex = (
        <div>
          {this.state.performanceData.map(item => {
            return <div className="entry" key={item.id}>
              <h4>Entry: # {item.id}</h4>
              <p>Date: {item.created_at}, Rank: {item.data.message}</p>
              <button id="deleteButton" >Delete Entry</button>
            </div>
          })}
        </div>
      )
    }

    return (
      <div id='performance'>
        {dataIndex}
      </div>
    )
  }      
}

export default DisplayPerformanceData