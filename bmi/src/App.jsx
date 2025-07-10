import { useState } from 'react'
import './App.css'

function App() {
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bmi, setBmi] = useState(null)
    const [bmiStatus,setBmiStatus] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

  const calculateBmi = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!isNaN(h) && !isNaN(w) && h > 0 && w > 0) {
     const heightInMeters = h / 100;
     const bmiValue = w / (heightInMeters * heightInMeters)
     setBmi(bmiValue.toFixed(2))
     if (bmiValue < 18.5) {
      setBmiStatus('Under weight')
     } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setBmiStatus('Normal weight')
     } else if (bmiValue > 25 && bmiValue < 29.9) {
      setBmiStatus('Over Weight')
     } else {
      setBmiStatus('Obese')
     }
     setErrorMsg('')
    }else {
      setBmi(null)
      setBmiStatus('')
      setErrorMsg('Please enter a valid weight ahd height in number.')
    }
  }

      const clearAll = () => {
      setHeight('')
      setWeight('')
      setBmiStatus('')
      setBmi(null)
      setErrorMsg('')
    }
  return (
    <>
    <div className="bmi-calculator">
      <div className="box"></div>
      <div className="data">
        <h1>BMI CALCULATOR</h1>
        <p className="error">{errorMsg}</p>
        <div className="input-container">
          <label htmlFor='height'>Height (cm):</label>
          <input type="text" id='height'value={height} onChange={(e)=>setHeight(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor='weight'>Weight (kg):</label>
          <input type="text" id='weight' value={weight} onChange={(e)=>setWeight(e.target.value)}/>
        </div>
        <button onClick={calculateBmi}>Calculate BMI</button>
        <button onClick={clearAll}>Clear</button>
        {bmi !== null && (<div className="result">
          <p>your BMI is :{bmi}</p>
          <p>Status:{bmiStatus}</p>
        </div>)}
      </div>
    </div>
    </>
  )
}

export default App
