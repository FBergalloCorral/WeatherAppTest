import React from 'react';
import CityOptions from './cityOption';
// Theoretically this will make a dropdown from the list of options within firestore, at the moment it's static
class CitySelector extends React.Component {
    render() {
      const cityArray = [{id:0,city:'Barcelona',country:'Spain'},{id:1,city:'Zaragoza',country:'Spain'}]
      const cityList = cityArray.map((prop) => <CityOptions id={prop.id} city={prop.city} country={prop.country} />);
      return (
        <select>
            {cityList}
        </select>
      );
    }
  }
export default CitySelector;