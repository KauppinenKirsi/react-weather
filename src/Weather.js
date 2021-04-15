import React from 'react';

const APIKEY = "ec77421a82d5ac491b3635de9d9b9fcf";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?"

export default class Weather extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           temp: 0,
           windSpeed: 0,
           windDirection: 0,
           description: "",
           icon: ""
       }
   }

   componentDidMount() {
       const url = apiUrl + 
       "lat=" + this.props.lat +
       "&lon=" + this.props.lng +
       "&units=metric" + "&appid=" + APIKEY;

       fetch(url)
       .then (res => res.json())
       .then(
           (result) => {
               console.log(result);
               this.setState({
                   temp: result.main.temp,
                   windSpeed: result.wind.speed,
                   windDirection: result.wind.deg,
                   description: result.weather[0].description,
                   icon: result.weather[0].icon

               });
           }, 
           (error) => {
               alert(error);
           }
       )
   }
   
    render() {
       const {temp, windSpeed, windDirection, description, icon} = this.state;
       const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
       
        return (
            <div>
              <h3>Weather at your location</h3>  
              <p>{temp} &#176;C</p>
              <p>{windSpeed} m/s {windDirection} degrees</p>
              <p>{description}</p>
              <img src={iconUrl} alt="" />
            </div>
        )
    }
}
