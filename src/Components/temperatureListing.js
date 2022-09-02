import React from 'react';
//This is used to make the hourly temperature in the daily scope-in
class TemperatureListing extends React.Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.hour}
                </td>
                <td>
                    {this.props.temperature}
                </td>
            </tr>
        );
    }
}
export default TemperatureListing;