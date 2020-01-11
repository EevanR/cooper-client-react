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
    renderIndex: false
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
    switch(true) {
      case renderRegisterForm && !authenticated:
        renderRegister = <RegisterForm submitFormHandler={this.onRegister}/>;
        break;
      case !renderRegisterForm && !authenticated:
        renderRegister = (
          <>
            <button
              id="register"
              onClick={() => this.setState({ renderRegisterForm: true })}
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
            <button
              id="login"
              onClick={() => this.setState({ renderLoginForm: true })}
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
            <p>Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}</p>
            <button onClick={() => this.onLogout()}>Log out</button>
          </>
        );
        if (this.state.renderIndex) {
          performanceDataIndex = (
            <>
              <DisplayPerformanceData
                updateIndex={this.state.updateIndex}
                indexUpdated={() => this.setState({ updateIndex: false })}
              />
              <button onClick={() => this.setState({ renderIndex: false })}>Hide past entries</button>
            </>
          );
        } else {
          performanceDataIndex = (
            <button id="show-index" onClick={() => this.setState({ renderIndex: true })}>Show past entries</button>
          )
        };
    }
    
    return (
      <>
        <InputFields onChangeHandler={this.onChangeHandler} />
        {renderLogin}
        {renderRegister}
        <DisplayCooperResult
          distance={this.state.distance}
          gender={this.state.gender}
          age={this.state.age}
          authenticated={this.state.authenticated}
          entrySaved={this.state.entrySaved}
          entryHandler={() => this.setState({ entrySaved: true, updateIndex: true})}
        />
        {performanceDataIndex}
        <Chart />
      </>
    );
  }
}

export default App;