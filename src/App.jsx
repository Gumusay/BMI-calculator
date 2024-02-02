import './App.css';
import logo from '../public/img/bmi-logo.svg';
import removebg from '../public/img/removebg.svg';
import pinkicon from '../public/img/healthy-pink-icon.svg';
import orangeicon from '../public/img/regular-orange-icon.svg';
import blueicon from '../public/img/sllep-icon-blue.svg';
import gender from '../public/img/gender.svg';
import age from '../public/img/age.svg';
import muscle from '../public/img/muscle.svg';
import pregnan from '../public/img/pregnan.svg';
import race from '../public/img/race.svg';
import { useState } from 'react';
function App() {
    const [unit, setUnit] = useState('metric'); // Initial unit is metric
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmiResult, setBmiResult] = useState(null);
    const [status, setStatus] = useState("");

  function calculateBMI() {
    let bmi;
    if (unit === 'metric') {
      bmi = Number(weight / (height / 100) ** 2).toFixed(2);
    } else {
      // Imperial birimlerle hesaplama
      const totalInches = Number(document.getElementById('heightFT').value) * 12 + Number(document.getElementById('heightIN').value);
      const totalPounds = Number(document.getElementById('weightST').value) * 14 + Number(document.getElementById('weightLBS').value);
      
      bmi = Number((totalPounds / (totalInches ** 2)) * 703).toFixed(2);
    }
    setBmiResult(bmi);

    let bmiStatus = getStatus(bmi);

    setStatus(bmiStatus);

    setHeight("");
    setWeight("");
  }
    const handleUnitChange = (e) => {
      setUnit(e.target.value);
    };

    function getStatus(bmi) {
      if (bmi < 18.5) return "Underweight";
      else if (bmi >= 18.5 && bmi < 24.9) return "Normal";
      else if (bmi >= 25 && bmi < 29.9) return "Overweight";
      else return "Obese";
    }

  
  return (
    <>
      <div className="container">
        <header>
          <div className="header-content">
            <img src={logo} alt="logo" />
            <div className='header-text'>
              <h1>Body Mass Index Calculator</h1>
              <h5>Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and well-being.</h5>
            </div>
          </div>
          <form className='card-calculator' >
            <h4>Enter your details below</h4>
            <div className='units-container'>
                <label htmlFor="metric">
                  <input type="radio" name="unit" id='metric' value="metric" checked={unit === 'metric'} onChange={handleUnitChange} />
                    Metric
                </label>

                <label htmlFor="imperial">
                  <input type="radio" name="unit" id='imperial' value="imperial" checked={unit === 'imperial'} onChange={handleUnitChange}/>
                    Imperial
                </label>
            </div>
            <div>
            <button className='hesapla' type="button"
            onClick={calculateBMI}>HESAPLA</button>
          </div>

            {unit === 'metric' && (
            <div className='measure-container metric'>
                <label htmlFor="height">
                  <p>Height</p>
                  <div className='input-wrapper'>
                    <input type="number" name="height" id='heightCM' autoComplete='off' value={height}
                    onChange={(e) => setHeight(e.target.value)} />
                    <label htmlFor="height">cm</label>
                  </div>
                </label>
                <label htmlFor="weight">
                  <p>Weight</p>
                  <div className='input-wrapper'>
                    <input type="number" name="weight" id='weightCM' autoComplete='off' value={weight}
                     onChange={(e) => setWeight(e.target.value)} />
                    <label htmlFor="weight">kg</label>
                  </div>
                </label>
            </div>
          )}
         


            {unit === 'imperial' && (
            <div className='measure-container imperial hidden'>
                <label htmlFor="height">
                  <p>Height</p>
                  <div className='input-wrapper'>
                    <input type="number" name="height" id='heightFT' autoComplete='off'/>
                    <label htmlFor="height">ft</label>
                  </div>
                  <div className='input-wrapper'>
                    <input type="number" name="height" id='heightIN'autoComplete='off' />
                    <label htmlFor="height">in</label>
                  </div>
                </label>
                <label htmlFor="weight">
                  <p>Weight</p>
                  <div className="flex-wrapper">
                    <div className='input-wrapper'>
                      <input type="number" name="weight" id='weightST'autoComplete='off' />
                      <label htmlFor="weight">st</label>
                    </div>
                    <div className='input-wrapper'>
                      <input type="number" name="weight" id='weightLBS'autoComplete='off' />
                      <label htmlFor="weight">lbs</label>
                    </div>
                  </div> 
                </label>
            </div>
            )}
            {bmiResult && (
            <div className='results-card outcome hidden'>
              <div className="bmi-score">
                <p><strong>Your BMI is...</strong></p>
                <p className='results'>{bmiResult}</p>
              </div>
              <h5 className='results-summary'>
                Your BMI suggests you’re a healthy weight. Your ideal weight is between <span className='classification'>{status}</span>
              </h5>
            </div>
           )}

            <div className='results-card placeholder'>
              <h3>Welcome!</h3>
              <h5>Enter your height and weight and you’ll see your BMI result here</h5>
            </div>
          </form>
        </header>

        

        <section className='result'>
            <img src={removebg} alt="removebg" />
          <div className='result-text'>
            <h2>What your BMI result means</h2>
            <h5>A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.</h5>
          </div>
        </section>



      <section className="tips">
          <div className='tips-item'>
            <img src={pinkicon} alt="pinkIcon" />
            <div className="tips-text">
              <h4>Healthy eating</h4>
              <h5>Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental clarity, and mood.</h5>
            </div>
           
          </div>

          <div className='tips-item'>
            <img src={orangeicon} alt="orangeIcon" />
            <div className="tips-text">
              <h4>Regular exercise</h4>
              <h5>Exercise improves fitness, aids weight control, elevates mood, and reduces disease risk, fostering wellness and longevity.</h5>
            </div>
          </div>

          <div className='tips-item'>
            <img src={blueicon} alt="blueIcon" />
            <div className="tips-text">
              <h4>Adequate sleep</h4>
              <h5>Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall restoration and rejuvenation.</h5>
            </div> 
          </div>
        </section>

        <section className='limitations'>

            <div className='limit-text'>
              <h2>Limitations of BMI</h2>
              <h5>Although BMI is often a practical indicator of healthy weight, it is not suited for every person. Specific groups should carefully consider their BMI outcomes, and in certain cases, the measurement may not be beneficial to use.</h5>
            </div>

            <div className='limit-boxs'>
              <div className='box-card genderBox'>
                <div className='flex-logo'>
                  <img src={gender} alt="gender" />
                  <h4>Gender</h4>
                </div>
                <h5>The development and body fat composition of girls and boys vary with age. Consequently, a child's age and gender are considered when evaluating their BMI.</h5>
              </div>


              <div className='box-card ageBox'>
                <div className="flex-logo">
                  <img src={age} alt="age" />
                  <h4>Age</h4>
                </div>
                <h5>In aging individuals, increased body fat and muscle loss may cause BMI to underestimate body fat content.</h5>
              </div>

              <div className='box-card muscleBox'>
                <div className="flex-logo">
                  <img src={muscle} alt="muscle" />
                  <h4>Muscle</h4>
                </div>
                <h5>BMI may misclassify muscular individuals as overweight or obese, as it doesn't differentiate muscle from fat.</h5>
              </div>

              <div className='box-card pregBox'>
                <div className="flex-logo">
                  <img src={pregnan} alt="pregnancy" />
                  <h4>Pregnancy</h4>
                </div>
                <h5>Expectant mothers experience weight gain due to their growing baby. Maintaining a healthy pre-pregnancy BMI is advisable to minimise health risks for both mother and child.</h5>
              </div>

              <div className='box-card raceBox'>
                <div className="flex-logo">
                  <img src={race} alt="race" />
                  <h4>Race</h4>
                </div>
                <h5>Certain health concerns may affect individuals of some Black and Asian origins at lower BMIs than others. To learn more, it is advised to discuss this with your GP or practice nurse.</h5>
              </div>
            </div>

           

        </section>
      </div>
    </>
  )
}

export default App
