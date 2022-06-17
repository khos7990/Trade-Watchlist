import React from "react";
import { Link } from "react-router-dom";
import "./Watchlist.css";
import WatchlistInput from "../WatchlistInput/WatchlistInput";
import Logout from "../Logout/Logout";

export default function DisplayWatchlists(props) {
  return (
    <div>
      <h2>Welcome {props.user.name} </h2>
      <h4> Your Watchlists </h4>

      <div className="app-container">
        <Logout setUserInState={props.setUserInState} />
        <table>
          <tbody>
            <tr>
              <td>{props.watchlist}</td>
              <td>
                <Link to={`/watchlist/${props.watchlist}`}>View Watchlist</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <WatchlistInput watchlist={props.watchlist} onChange={props.onChange} />
    </div>
  );
}

// export default class DisplayWatchlists extends Component {

//   render() {
//     return (

//       <div>
//           <h2>Welcome {this.props.user.name},</h2>
//           <h4>Your Watchlists</h4>

//           {this.state.Watchlist ?
//         <div className="app-container">
//           <table>
//             <tbody>
//                 <tr>
//                 <td>{this.state.Watchlist}</td>
//                 </tr>
//             </tbody>

//           </table>
//         </div>
//           :
//           <WatchlistInput name={this.state.Watchlist} onChange={this.handleChange} />

//           }

//       </div>
//     )
