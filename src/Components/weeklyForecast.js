//Temporary display for the daily forecast for a specified period (currently 5 days, will like change later), likely to change according to a date drop-down selection
import React from 'react';
import ForecastListing from './forecastListing';
import DailyForecast from './dailyForecast';
class WeeklyForecast extends React.Component {
    
    constructor(props) {
        super(props);
        this.setDaySelected = this.setDaySelected.bind(this);
      }
    render() {
        const days = this.props.tempList.map((prop) => <ForecastListing parent={this} day={prop.day} temperature={prop.temp} />)
        var highlightedDay;
        if (this.props.parent.state.selectedDay !==-1){
         highlightedDay=<DailyForecast parent={this} selectedDay={this.props.parent.state.selectedDay} tempHourly={this.props.tempHourly} />;
        }else {highlightedDay = <p/>}
        return (
            <React.Fragment>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <button title="remove selected day" onClick={()=>this.setDaySelected(-1)}> Day Of The Week</button>
                        </td>
                        <td>
                            ºC
                        </td>
                    </tr>
                    {days}
                    </tbody>
                </table>
                { highlightedDay }
            </React.Fragment>
        )
    }
    
    setDaySelected(dayOfTheWeek){
        this.props.parent.setDaySelected(dayOfTheWeek);
            }
}
export default WeeklyForecast;