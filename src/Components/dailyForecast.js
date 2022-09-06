//Temporary display for the hourly forecast for a given day, likely to be iterated and hidden to then set as displayed when a specific day is selected.
import React from 'react';
import TemperatureListing from './temperatureListing';
class DailyForecast extends React.Component {
    constructor(props){
        super(props);
        }
    render() {
        this.forecastList= (this.props.tempHourly.map((prop) => <TemperatureListing hour={prop.hour} temperature={prop.temp} />))
        return (
            <table>
                <tbody>
                <tr>
                    <td>
                        Hour
                    </td>
                    <td>
                        ºC
                    </td>
                </tr>
                {this.forecastList}
                </tbody>
            </table>
        )
    }
}
export default DailyForecast;