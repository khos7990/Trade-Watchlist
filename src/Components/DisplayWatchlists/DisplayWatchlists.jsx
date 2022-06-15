import {Component} from "react"
import './Watchlist.css'
import WatchlistInput from "../WatchlistInput/WatchlistInput"





export default class DisplayWatchlists extends Component {

    state = {
        Watchlists: []
    }
  render() {
    return (


      <div>
          <h2>Welcome {this.props.user.name},</h2>
          <h4>Your Watchlists</h4>

          {this.state.Watchlists.length > 0 ? 
        <div className="app-container">  
          <table>
            <tbody>
                <tr>
                <td></td>
                </tr>
            </tbody>

          </table>
        </div>
          :
          <WatchlistInput />

  
          }


      </div>
    )
 

}
}
