import  { Component } from 'react'
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
            body: JSON.stringify({pairs: pairs})
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
          <h2> Welcome {this.props.user.name}, Your Watchlist </h2>
        <Input value={this.state.pair} onChange={this.handleChange} onClick={this.handleClick} />
        <Logout setUserInState={this.props.setUserInState} />
        <DisplayAllPairs pairs={this.state.pairs} clickForChart={this.props.handleClickForChart} pairDB={this.state.pairDB} delete={this.handleDelete} />
      </div>
    )
  }
}
