import React from 'react';
import CitySelector from './citySelector'
import TemperatureListing from './temperatureListing';
import WeeklyForecast from './weeklyForecast';
import ForecastListing from './citySelector';
import DailyForecast from './dailyForecast';
class TemperaturePage extends React.Component {
    constructor(props) {
        super(props); // super call
        // command binding
        this.setDaySelected = this.setDaySelected.bind(this);
        // state binding
        this.state = { selectedDay: -1, tempHourly: [] };  // keep selected date in Object state
        // variables
        // temperature list for a week
        this.tempList = [];
        for (var i = 0; i < 7; i++) {
            var date = new Date();
            date.setDate(date.getDate() + i);
            // state properties: forecastList , tempListPerDay, selectedDay
            this.tempListPerDay = []; // list later used to house the hourly temperature of days in a week
            var x = 10;// random temperature variation
            var tempList = []; //replace with props later ; right now will cause a random 
            var temp = 0;
            var temperatureAveraging = 0;
            for (var z = 0; z < 24; z++) {
                temp = 25 + Math.round((Math.random() * x) - (x / 2));
                this.tempListPerDay.push({ hour: z, temp: temp });
                temperatureAveraging += temp;
            }
            temperatureAveraging = Math.round(temperatureAveraging / 24);
            this.tempList.push({ day: date, temp: temperatureAveraging, tempHourly: this.tempListPerDay }); // TEMP math still being applied randomly,

        }
        console.log("in temperature constructor")
    }
    setDaySelected(dayOfTheWeek) {
        console.log(this.tempList[dayOfTheWeek]);
        if (dayOfTheWeek !== -1) {
            this.setState({ selectedDay: dayOfTheWeek, tempHourly: this.tempList[dayOfTheWeek].tempHourly });
        } else {
            this.setState({ selectedDay: dayOfTheWeek, tempHourly: [] });
        }
    }
    render() {
        return (
            <React.Fragment>
                <CitySelector parent={this} />
                <WeeklyForecast parent={this} tempList={this.tempList} tempHourly={this.state.tempHourly} />
            </React.Fragment>
        )
    }
}
export default TemperaturePage;