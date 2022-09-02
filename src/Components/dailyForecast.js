//Temporary display for the hourly forecast for a given day, likely to be iterated and hidden to then set as displayed when a specific day is selected.
import React from 'react';
import TemperatureListing from './temperatureListing';
class DailyForecast extends React.Component {
    render() {
        var x = 10
        var tempList = []//replace with props later
        for (var i = 0; i < 24; i++) {
            tempList.push({ hour: i, temp: 25 + Math.round((Math.random() * x) - (x / 2)) });
        }
        const forecastList = tempList.map((prop) => <TemperatureListing hour={prop.hour} temperature={prop.temp} />)
        return (
            <table>
                <tr>
                    <td>
                        Hour
                    </td>
                    <td>
                        ºC
                    </td>
                </tr>
                {forecastList}
            </table>
        )
    }
}
export default DailyForecast;