import React from 'react'
import {Link} from 'react-router-dom';
import './Display.css'

export default function DisplayAllPairs(props) {
  return (
    <div className='app-container'>
       <table>
      <thead>
        <tr>
          <th>PAIR</th>
          <th>Chart</th>
          <th>
            
          </th>
        </tr>
      </thead>
      <tbody>
        {props.pairDB.map((pair) => (
        <tr>
            <td>{pair.pairs}</td>
            <td><Link name={pair.pairs} onClick={props.clickForChart} to={`/chart/${pair.pairs}`}>Click for Chart</Link></td>
            <td><button name={pair._id} onClick={props.delete}>Delete Pair</button></td>
        </tr>
        ))}
       
      </tbody>
    </table>



    </div>
  )
}
