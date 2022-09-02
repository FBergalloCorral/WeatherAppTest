//Temporary display for the daily forecast for a specified period (currently 5 days, will like change later), likely to change according to a date drop-down selection
import React from 'react';
import ForecastListing from './forecastListing';
class WeeklyForecast extends React.Component {
    render() {
        var x = 5
        var tempList = [];
        for (var i = 0; i < x; i++) {
            var date = new Date();
            date.setDate(date.getDate() + i);
            tempList.push({ day: date, temp: (25 + Math.round((Math.random() * x) - (x / 2)) / x) });
        }
        const days = tempList.map((prop) => <ForecastListing day={prop.day} temperature={prop.temp} />)
        return (
            <table>
                <tr>
                    <td>
                        Day Of The Week
                    </td>
                    <td>
                        ºC
                    </td>
                </tr>
                {days}
            </table>
        )
    }
}
export default WeeklyForecast;