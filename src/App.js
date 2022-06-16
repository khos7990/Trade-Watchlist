import { Component } from 'react'
import {Route, Routes} from 'react-router-dom'
import { Typography } from '@material-ui/core'

import './App.css';

import Auth from './pages/Auth/Auth';
import Watchlist from './pages/Watchlist/Watchlist';
import DisplayWatchlists from './Components/DisplayWatchlists/DisplayWatchlists';
import Chart from './pages/Chart/newChart';
import Inflation from './pages/Chart/InflationChart';

export default class App extends Component {
  state = {
    user: null,
    clickedPair: '',
   
  }

  setUserInState = (incomingUserData) => {
    this.setState({user: incomingUserData})
  }


      onChange = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }


  handleClickForChart = (e) => {
    let clickedPair = e.target.name
    this.setState({clickedPair})
  }




  componentDidMount() {
    let token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        token = null;
      } else {
        let userInfo = payload.user
        this.setState({user: userInfo})
      }
    }
  }




  render() {
    return (


      <main className='App'>
      {this.state.user ?  
        <Routes>
        <Route path="/watchlist" element={<Watchlist 
          setUserInState={this.setUserInState}
          user={this.state.user}
          handleClickForChart={this.handleClickForChart}
          />}/>
          
          <Route path="/chart/:id" element={<Chart symbol={this.state.clickedPair} />}/>
          <Route path="/chart/inflation" element={<Inflation/>}/>
          </Routes>
          : 
          <Auth setUserInState={this.setUserInState} />
        }
  </main>
  )
  }
}
