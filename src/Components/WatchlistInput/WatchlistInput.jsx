import React from 'react';
import {Link} from 'react-router-dom';

export default function WatchlistInput(props) {
  return (
    <div>

      <p>{props.watchlist}</p>
        <input name='watchlist' value={props.watchlist} onChange={props.onChange} type='text'></input>
        <Link  name='watchlist' to={'/'}> Create Watchlist</Link> 
    </div>
  )
}
