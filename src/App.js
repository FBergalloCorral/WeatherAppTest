import './App.css';
import TemperaturePage from './Components/temperaturePage';
import firebase from "firebase/app";
import "firebase/firestore";
//import { initializeApp } from "firebase/app";

function App() {
  //Firebase Config
  const firebaseConfig = {
    apiKey: "AIzaSyCD8te_W8T-xvkfiVWJgjlE_wYR1cpQzpg",
    authDomain: "weatherapptest-e6318.firebaseapp.com",
    projectId: "weatherapptest-e6318",
    storageBucket: "weatherapptest-e6318.appspot.com",
    messagingSenderId: "108353768993",
    appId: "1:108353768993:web:0bdcca738339ebd4f01d60"
  };
  //Firebase bootup
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  return (
    <div className="App">
      <TemperaturePage database={db}/>
    </div>
  );
}

export default App;
