
import { Component } from "react";
import './newChart.css';
import {CrosshairPlugin,Interpolate} from 'chartjs-plugin-crosshair';
import {Link} from 'react-router-dom';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  Interaction,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Button } from "@material-ui/core";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(CrosshairPlugin);
Interaction.modes.interpolate = Interpolate

export default class NewChart extends Component {
    
    state = {
        options : {
            responsive: true,
            plugins: {
              tooltip: {
                mode: 'interpolate',
                intersect: false
              },
              crosshair: {
                line: {
                  color: '#ffffff',
                  width: 1
                },
                sync: {
                  enabled: true,
                  group: 1,
                  suppressTooltips: false
                },
                zoom: {
                  enabled: true,
                  zoomboxBackgroundColor: 'rgba(66,133,244,0.2)',
                  zoomboxBorderColor: '#48F',
                  zoomButtonText: 'Reset Zoom',
                  zoomButtonClass: 'reset-zoom',
                },   callbacks: {
                  beforeZoom: () => function(start, end) {                  
                    return true;
                  },
                  afterZoom: () => function(start, end) {                  
                  }
              },
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: 'Inflation Chart',
                },
    }
  }
},

        data : {
            labels : [],
            datasets: [
                {
                    label: "Percentage",
                    data: [],
                    borderColor: "rgb(100, 183, 255)",
                    backgroundColor: "rgba(100, 183, 255, 0.5)",
              },  
            ]
        }
      }

    handleNews =  async (e) => {
        let data2 = []
        let dates = []
        let value = []
        let api = 'H4KXZRFHQOSF1C3H';
        let type = 'INFLATION';
        let url = `https://www.alphavantage.co/query?function=${type}&apikey=${api}`;
        let data = await fetch(url).then(res => res.json())      
        for (const [date, value] of Object.entries(data['data'])) {
            data2.push(value)
        }
        for (let i = 0; i <= 10; i++) {
            dates.push(data2[i]['date'])
            value.push(data2[i]['value'])
          
        }
       let chartdata = {...this.state.data}
       dates.reverse()
       dates.forEach((date) => (
            chartdata.labels.push(date)
        ))
       
        value.reverse()
        console.log(value)
        value.forEach((val) => (
            chartdata.datasets[0].data.push(val)
        ))


        this.setState({data: chartdata})
    }
        
 
   

    render() {
    return (
        <div>
        <Button type="submit" variant="contained" color='primary' onClick={this.handleNews}>Click Me</Button>
        <Link to={'/watchlist'}>Go Back</Link>
        <h3>{'U.S Inflation Chart'}</h3>
        <Line height='250' width='674' options={this.state.options} data={this.state.data}  />

        </div>
        );
    }
}












    