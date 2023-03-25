import React,{useState} from 'react';
import { DateTime } from "luxon";
import dateFormat, { masks } from "dateformat";

import './App.css';

function App() {
  const [city,setCity] = useState('');
  const [result,setResult] = useState('');
  const [date,setDate] = useState('');
  const changeHandler = e =>{
      setCity(e.target.value);
  }
  const submitHandler = e =>{
    e.preventDefault();
    

   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`).then(
    response =>response.json()
   ).then(data =>{  
    const kelvin=data.main.temp;
    const celsius =Math.floor(kelvin - 273.15); 

    const now = new Date();
    
    setResult("Temperature  at "+city+" is "+ celsius + "°C");
    setDate(dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"))
    setCity("");
   }).catch(error => console.log(error))
  }
  
  return (
    <div className='card'>
      <div className='cardbody'>
        <center>
        <h2 className='cardTitle'>Weather App</h2>
        <form onSubmit={submitHandler}>
        <input className='inputbox' type="text" name='city' onChange={changeHandler} /> <br/> <br/>
        <input className='submit' type="submit" value="Get Temperature"/>
        </form>
        <h2>{result}</h2>
        <h2>{date}</h2>
        </center>
      </div>
    </div>
  );
}

export default App;
