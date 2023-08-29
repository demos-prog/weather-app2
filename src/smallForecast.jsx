import './forecast.css';

export default function SmallForeCast({ num, setCurrentDate, futureDate }) {
  return <div className='smallContainer' onClick={() => setCurrentDate(num)}>{futureDate}</div>
}