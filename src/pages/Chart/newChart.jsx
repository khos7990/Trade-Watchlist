
import { Component } from "react";
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
        ready: false,
        dates: [],
        prices: [],
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
                    text: this.props.symbol,
                }
            }
        }

      }, 

        data : {
            labels : [],
            datasets: [
                {
                    label: "Closed Price(USD)",
                    data: [],
                    borderColor: "rgb(100, 183, 255)",
                    backgroundColor: "rgba(100, 183, 255, 0.5)",
              },  {
                label: 'Price High(USD)',
                data: [],
                borderColor: 'rgb(60, 179, 113)',
                backgroundColor: 'rgba(60, 179, 113, 0.5)',
                
              }, {
                label: 'Price Low(USD)',
                data: [],
                borderColor: 'rgb(106, 90, 205)',
                backgroundColor: 'rgba(106, 90, 205, 0.5)',
              }
            ]
        }


    }




    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
      }
       
    handleClick =  async (e) => {
        
        let api = 'H4KXZRFHQOSF1C3H';
        let symbol =  this.props.symbol
        let time = 'TIME_SERIES_DAILY'
        let url = `https://www.alphavantage.co/query?function=${time}&symbol=${symbol}&apikey=${api}`;
        let data = await fetch(url).then(res => res.json())        
        data = (data['Time Series (Daily)'])
        let newDates = [...this.state.dates]
        let newPrices = [...this.state.prices]
        let chartData = {...this.state.data}
        for (const [date, value] of Object.entries(data)) {
            newDates.push(date)
            newPrices.push(value)
          }
          newDates.splice(-90)
          newDates.reverse()
          newDates.map((dates) => {
              chartData.labels.push(dates);
          })
          
          newPrices.splice(-90)
          newPrices.reverse()
          newPrices.map((price) => {
            let closedPrice = price['4. close']
            let dailyHigh = price['2. high']
            let dailyLow = price['3. low']

            chartData.datasets[0].data.push(closedPrice);
            chartData.datasets[1].data.push(dailyHigh);
            chartData.datasets[2].data.push(dailyLow);
          }) 
              
        this.setState({data: chartData, ready: true})

     }
     componentDidMount() {
         if (this.props.symbol) {
         this.handleClick()
         }
     }
    
    render() {
        if(!this.state.ready) {
            return <h1>Loading...</h1>
        } 
    return (
        <div className="chart">
        <h1 className="charttitle">{this.props.symbol}</h1>
        <Link className="backBtn" to='/'>Go Back</Link>
        <Line height='250' width='674' options={this.state.options} data={this.state.data}  />

        </div>
        );
    }
}
