import React from 'react';
import CitySelector from './citySelector'
import WeeklyForecast from './weeklyForecast';
class TemperaturePage extends React.Component {
    constructor(props) {
        super(props); // super call
        // command binding
        this.setDaySelected = this.setDaySelected.bind(this);
        // state binding
        this.state = { selectedDay: -1, tempHourly: [], tempList: [] };  // keep selected date in Object state
        // variables
        // temperature list for the week

        console.log("in temperature constructor")
    }
    async updateWeek(cityNumber) {
        this.setState({ tempList: [] });
        console.log(this.state);
        var temporaryList = [];
        for (var i = 0; i < 7; i++) {
            var date = new Date();
            date.setDate(date.getDate() + i); // generate info for the following week
            var dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
            const doc = await this.props.database.doc("/Weather/" + cityNumber + "/weatherReports/" + dateString).get();
            this.tempListPerDay = []; // list later used to house the hourly temperature of days in a week
            var temperatureAveraging = 0;// temperature Average initialization
            if (!doc.exists) {
                var x = 10;// random temperature variation
                var temp = 0; // temp initialization
                for (var z = 0; z < 24; z++) {
                    temp = 25 + Math.round((Math.random() * x) - (x / 2));
                    this.tempListPerDay.push({ hour: z, temp: temp });
                    temperatureAveraging += temp;
                }
                var data = {
                    hourlyForecast: this.tempListPerDay
                }
                this.props.database.doc("/Weather/" + cityNumber + "/weatherReports/" + dateString).set(data)
            } else {
                this.tempListPerDay=doc.data().hourlyForecast;
                doc.data().hourlyForecast.forEach(element => {
                    temperatureAveraging += element.temp;
                });
            }
            temperatureAveraging = Math.round(temperatureAveraging / 24);
            temporaryList.push({ day: date, temp: temperatureAveraging, tempHourly: this.tempListPerDay }); // TEMP math still being applied randomly,
        }
        this.setState({ tempList: temporaryList });
    }
    setDaySelected(dayOfTheWeek) {
        var today = new Date().getDate();
        if (dayOfTheWeek !== -1) {
            this.setState({ selectedDay: (dayOfTheWeek-today), tempHourly: this.state.tempList[dayOfTheWeek-today].tempHourly });
        } else {
            this.setState({ selectedDay: (dayOfTheWeek-today), tempHourly: [] });
        }
    }
    render() {
        return (
            <React.Fragment>
                <CitySelector parent={this} />
                <WeeklyForecast parent={this} tempList={this.state.tempList} tempHourly={this.state.tempHourly} />
            </React.Fragment>
        )
    }
}
export default TemperaturePage;