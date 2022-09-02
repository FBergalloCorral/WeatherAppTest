import React from 'react';
//This is used to make the individual options in the citySelector list
class CityOptions extends React.Component {
    render() {
      return <option value={this.props.id}>{this.props.city}, {this.props.country}</option>;
    }
  }
  export default CityOptions;