//Temporary display for the hourly forecast for a given day, likely to be iterated and hidden to then set as displayed when a specific day is selected.
import React from 'react';
import TemperatureListing from './temperatureListing';
class DailyForecast extends React.Component {
    constructor(props){
        super(props);
        //this.state = { tempHourly : this.props.tempHourly };
        }
    render() {
        console.log(this.props.tempHourly);// use refs to push it up to the weekly bit, that way the state can be altered more easily at the push of a button
        console.log("in daily render");
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