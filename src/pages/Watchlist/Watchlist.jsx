import  { Component } from 'react'
import {Link} from 'react-router-dom';
import { Toolbar, Typography, AppBar, IconButton } from '@material-ui/core'

import Logout from '../../Components/Logout/Logout';
import Input from '../../Components/Input/Inputs';
import DisplayAllPairs from '../../Components/DisplayAllPairs/DisplayAllPairs';

export default class Watchlist extends Component {
    state = {
        pair: '',
        pairs: [],
        pairDB: [],
       
    }


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
      }

      handleClick = async (e) => {
        let pair = this.state.pair
        let pairs = [...this.state.pairs];
        pairs.push(pair)
        try {
          let jwt = localStorage.getItem('token')
          let options = {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Authorization": 'Bearer ' + jwt},
            body: JSON.stringify({Name: (this.props.watchlist) ,pairs: pairs})
          }
          let fetchResponse = await fetch('/watchlist', options)
          if (fetchResponse.status === 200) { 
            this.setState({pairs: ''})
          let serverResponse = await fetchResponse.json()
          console.log(serverResponse)
          }
          this.getPairs()
        } catch (err) {
          console.log(err)

        }
      }

      getPairs = async () => {
        let jwt = localStorage.getItem('token')
        let data = await fetch('/watchlist', {
        headers: {Authorization: 'Bearer ' + jwt},
        })
        let list = await data.json()
        this.setState({pairDB: list})
      }


      handleDelete = async (e) => {
        let newDelete = e.target.name
        try {
          let options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: newDelete})
          }
          let fetchResponse = await fetch('/watchlist/delete', options)
          if (fetchResponse.status === 200) { 
          let serverResponse = await fetchResponse.json()
          console.log(serverResponse)
          }
          this.getPairs();
        } catch (err) {
          console.log(err)

      }

    }


       componentDidMount() {
         this.getPairs()
       }

  render() {
    return (
      <div>
        <AppBar>
          <Logout setUserInState={this.props.setUserInState} />
          <Typography className='navText' variant='h6' align='center'> Welcome to Watchlist</Typography>
        <Link to={'/chart/inflation'}> <Typography variant='h6'>IMPORTANT!!!! See the Rise of Inflation</Typography> </Link>

        </AppBar>
          <Typography variant='h4'> Welcome {this.props.user.name}, </Typography>
         <Typography variant='subtitle1'> Your Watchlist </Typography>
        <Input value={this.state.pair} onChange={this.handleChange} onClick={this.handleClick} />
      
        <DisplayAllPairs pairs={this.state.pairs} clickForChart={this.props.handleClickForChart} pairDB={this.state.pairDB} delete={this.handleDelete} />
      </div>
    )
  }
}
