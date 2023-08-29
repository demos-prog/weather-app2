import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './forecast.css';

export default function Forecast({ nowIs, currentDate, place, country, enteredData }) {
  const hourTemps = [];
  for (const item of enteredData.hour) {
    hourTemps.push({ hour: item.time.slice(-5), Temperature: item.temp_c })
  }

  return (
    <div className='container'>
      <div className='tp'>
        <img src={enteredData.day.condition.icon} alt="Logo" />
        <div className='h1wrap'>
          <p>{enteredData.date}</p>
          <h1>{place}</h1>
        </div>
        <h2>{`(${country})`}</h2>
      </div>
      <div>
        <div className='tm'>
          {currentDate === 0 && <div className='tm2'>Temp now is<h1>{`${nowIs} °C`}</h1></div>}
          <div>
            <p>{enteredData.day.condition.text}</p>
            <p>Chance of rain: {enteredData.day.daily_chance_of_rain} %</p>
            <p>Humidity: {enteredData.day.avghumidity} %</p>
          </div>
        </div>
        <br />
      </div>
      <br />
      <div style={{ width: '700px', height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hourTemps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Temperature" stroke="#362de3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}