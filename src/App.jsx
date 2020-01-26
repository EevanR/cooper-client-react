import React, { Component } from "react";
import DisplayCooperResult from "./components/DisplayCooperResult";
import InputFields from './components/InputFields';
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { authenticate } from './modules/auth';
import { saveUser } from './modules/userRegister';
import DisplayPerformanceData from "./components/DisplayPerformanceData";
import { logout } from "./modules/logout";
import Chart from "./components/Chart";
import './App.css';

class App extends Component {
  state = {
    distance: "",
    gender: "female",
    age: "",
    renderLoginForm: false,
    renderRegisterForm: false,
    authenticated: false,
    message: "",
    entrySaved: false,
    renderIndex: false,
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value, entrySaved: false });
  };

  onLogin = async e => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
      this.setState({ renderChart: <Chart/>})
    } else {
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  onLogout = async () => {
    const response = await logout() 
    if (!response.authenticated) {
      this.setState({renderRegisterForm: false});
      this.setState({authenticated: false});
      this.setState({renderLoginForm: false});
      this.setState({ distance: "", age: "" });
      sessionStorage.removeItem("credentials")
    } else {
      this.setState({message: response.message})
    }
  };

  onRegister = async e => {
    e.preventDefault();
    const response = await saveUser(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  render() {
    const { renderRegisterForm, renderLoginForm, authenticated, message } = this.state;
    let renderRegister;
    let renderLogin;
    let performanceDataIndex;
    let displayChart;
    switch(true) {
      case renderRegisterForm && !authenticated:
        renderRegister = <RegisterForm submitFormHandler={this.onRegister}/>;
        break;
      case !renderRegisterForm && !authenticated:
        renderRegister = (
          <>
            <button className="ui button"
              id="register"
              onClick={() => this.setState({ renderRegisterForm: true, renderLoginForm: false })}
            >
              Register
            </button>
            <p>{message}</p>
          </>
        );
    }

    switch(true) {
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case !renderLoginForm && !authenticated:
        renderLogin = (
          <>
            <button className="ui button"
              id="login"
              onClick={() => this.setState({ renderLoginForm: true, renderRegisterForm: false })}
            >
              Login
            </button>
            <p>{message}</p>
          </>
        );
        break;
      case authenticated:
        renderLogin = (
          <>
            <p id="greeting">Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}</p>
            <p>Check your stats below.</p>
            <button className="ui button" onClick={() => this.onLogout()}>Log out</button>
          </>
        );
        if (this.state.renderIndex) {
          performanceDataIndex = (
            <>
              <DisplayPerformanceData
                updateIndex={this.state.updateIndex}
                indexUpdated={() => this.setState({ updateIndex: false })}
              />
              <button className="ui vertical animated button" onClick={() => this.setState({ renderIndex: false })}>
              <div className="visible content">Hide past entries</div>
              <div className="hidden content"><i aria-hidden="true" className="arrow up icon"></i></div>
              </button>
            </>
          );
        } else {
          performanceDataIndex = (
            <button id="show-index" className="ui vertical animated button" onClick={() => this.setState({ renderIndex: true })}>
              <div className="visible content">Show past entries</div>
              <div className="hidden content"><i aria-hidden="true" className="arrow down icon"></i></div>
            </button>
          )
        };
    }

    if (authenticated) {
      displayChart = (
        <Chart />
      )
    } else {
      displayChart = (
        <h3>Login to display Charts!</h3>
      )
    }
    
    return (
      <>
        <div className="main-container">
          <h1>Run App</h1>
          <p>The Cooper Test (aka The 12-minute run) was developed by Dr. 
            Ken Cooper in 1968 as an easy way to measure aerobic fitness and 
            provide an estimate of VO2 max for military personnel. The Cooper 
            test, is still used today as a field test for determining
            aerobic fitness. Fill in the fields below to check your aerobic level.</p>
          <div>
            <div id="divider" className="fieldsLogin">
              <div className="input"><InputFields onChangeHandler={this.onChangeHandler} /></div>
              <div className="login">
                {renderLogin}
                {renderRegister}
              </div>
            </div>
          </div>
          <div id="divider" className="cooperResult">
            <DisplayCooperResult
              distance={this.state.distance}
              gender={this.state.gender}
              age={this.state.age}
              authenticated={this.state.authenticated}
              entrySaved={this.state.entrySaved}
              entryHandler={() => this.setState({ entrySaved: true, updateIndex: true})}
            />
          </div>
          <div id="center">
            {performanceDataIndex}
            {displayChart}
          </div>
          <div className="footer">
            <h6>Made with React 16.12.0 & Rails 2.5.1 </h6>
          </div>
        </div>
      </>
    );
  }
}

export default App;