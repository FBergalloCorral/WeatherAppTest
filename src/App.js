import './App.css';
import CitySelector from './Components/citySelector'
import DailyForecast from './Components/dailyForecast';
import WeeklyForecast from './Components/weeklyForecast';

function App() {
  return (
    <div className="App">
      <CitySelector/>
      <WeeklyForecast/>
      <DailyForecast/>
    </div>
  );
}

export default App;
