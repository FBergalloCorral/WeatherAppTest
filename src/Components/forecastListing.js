import React from 'react';
//This is used to make the individual Days in the forecast
class ForecastListing extends React.Component {
    render() {
        const daysOfTheWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        return (
            <tr>
                <td>
                    {daysOfTheWeek[this.props.day.getDay()]}
                </td>
                <td>
                    {this.props.temperature}
                </td>
            </tr>
        );
    }
}
export default ForecastListing;