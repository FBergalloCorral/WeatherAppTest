import React from 'react';
//This is used to make the individual Days in the forecast
class ForecastListing extends React.Component {
    constructor(props) {
        super(props);
        this.setDaySelected = this.setDaySelected.bind(this);
        console.log("in forecast listing constructor")
    }
    render() {
        var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return (
            <tr>
                <td>
                    <button onClick={() => { this.setDaySelected(this.props.day.getDay()) }}>
                        {daysOfTheWeek[this.props.day.getDay()]}
                    </button>
                </td>
                <td>
                    {this.props.temperature}
                </td>
            </tr>
        );
    }
    setDaySelected(dayOfTheWeek) {
        console.log("day selected")
        this.props.parent.setDaySelected(dayOfTheWeek);
        //console.log(dayOfTheWeek);
    }
}
export default ForecastListing;