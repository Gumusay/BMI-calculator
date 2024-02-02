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
      else if (bmi >= 18.5 && bmi < 24.9) return "18.5-24.9";
      else if (bmi >= 25 && bmi < 29.9) return "25-29.9";
      else return "Obese";
    }

  
  return (
    <>
      <div className="container">
        <header>
          <div className="header-content">
            <img src={logo} alt="logo" />
            <div className='header-text'>
              <h1>Vücut Kitle İndeksi Hesaplayıcı</h1>
              <h5>Vücut Kitle İndeksi (VKİ) hesaplayıcımızı kullanarak, boyunuzla ilişkilendirilmiş olarak ağırlığınızı daha iyi anlayabilirsiniz. VKİ, sağlıklı bir ağırlığın tek belirleyeni olmasa da, genel sağlık ve iyilik durumunuzu değerlendirmek için değerli bir başlangıç noktası sunar.</h5>
            </div>
          </div>
          <form className='card-calculator' >
            <h4>Aşağıya bilgilerinizi girin.</h4>
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
                  <p>Boy</p>
                  <div className='input-wrapper'>
                    <input type="number" name="height" id='heightCM' autoComplete='off' value={height}
                    onChange={(e) => setHeight(e.target.value)} />
                    <label htmlFor="height">cm</label>
                  </div>
                </label>
                <label htmlFor="weight">
                  <p>Kilo</p>
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
                  <p>Boy</p>
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
                  <p>Kilo</p>
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
                <p><strong>Vücut Kitle İndeksiniz...</strong></p>
                <p className='results'>{bmiResult}</p>
              </div>
              <h5 className='results-summary'>
               Vücut Kitle İndeksine göre <span className='classification'>{status}</span>
              </h5>
            </div>
           )}

            <div className='results-card placeholder'>
              <h3>Hoş geldiniz!</h3>
              <h5>Boy ve kilonuzu girin, VKİ sonucunuzu burada göreceksiniz.</h5>
            </div>
          </form>
        </header>

        

        <section className='result'>
            <img src={removebg} alt="removebg" />
          <div className='result-text'>
            <h2>Vücut Kitle İndeksi (VKİ) sonuçlarınızın anlamı nedir?</h2>
            <h5>18.5 ila 24.9 arasındaki bir BMI aralığı 'sağlıklı ağırlık' olarak kabul edilir. Sağlıklı bir ağırlığı korumak, ilerleyen dönemde obezite ve tip 2 diyabet gibi sağlık sorunları yaşama olasılığınızı azaltabilir. Dengeli bir diyet hedefleyin, yağ ve şeker içeriğini azaltın ve bol miktarda meyve ve sebze tüketmeye çalışın. Ayrıca, ideal olarak haftada beş gün boyunca günde 30 dakika civarında düzenli fiziksel aktivite hedefleyin.</h5>
          </div>
        </section>



      <section className="tips">
          <div className='tips-item'>
            <img src={pinkicon} alt="pinkIcon" />
            <div className="tips-text">
              <h4>Sağlıklı Beslenme</h4>
              <h5>Sağlıklı beslenme; kilo kontrolü, hastalık önleme, daha iyi sindirim, bağışıklık, zihinsel netlik ve ruh halini destekler</h5>
            </div>
           
          </div>

          <div className='tips-item'>
            <img src={orangeicon} alt="orangeIcon" />
            <div className="tips-text">
              <h4>Düzenli egzersiz</h4>
              <h5>Egzersiz, fitness'i artırır, kilo kontrolüne yardımcı olur, ruh halini yükseltir ve hastalık riskini azaltarak sağlıklı yaşamı ve uzun ömürü destekler.</h5>
            </div>
          </div>

          <div className='tips-item'>
            <img src={blueicon} alt="blueIcon" />
            <div className="tips-text">
              <h4>Yeterli Uyku</h4>
              <h5>Uyku, zihinsel netliği, duygusal dengeyi ve fiziksel sağlığı artırarak genel restorasyonu ve yeniden canlanmayı teşvik eder.</h5>
            </div> 
          </div>
        </section>

        <section className='limitations'>

            <div className='limit-text'>
              <h2>VKİ Sınırlamaları</h2>
              <h5>VKİ genellikle sağlıklı ağırlığın pratik bir göstergesi olsa da, herkes için uygun değildir. Belirli gruplar VKİ sonuçlarını dikkatlice düşünmelidir ve bazı durumlarda ölçüm kullanılmakta faydalı olmayabilir.</h5>
            </div>

            <div className='limit-boxs'>
              <div className='box-card genderBox'>
                <div className='flex-logo'>
                  <img src={gender} alt="gender" />
                  <h4>Cinsiyet</h4>
                </div>
                <h5>Kız ve erkeklerin gelişimi ile vücut yağ kompozisyonu yaşa bağlı olarak değişiklik gösterir. Bu nedenle, bir çocuğun VKİ'si değerlendirilirken çocuğun yaşı ve cinsiyeti dikkate alınır.</h5>
              </div>


              <div className='box-card ageBox'>
                <div className="flex-logo">
                  <img src={age} alt="age" />
                  <h4>Yaş</h4>
                </div>
                <h5>Yaşlanan bireylerde artan vücut yağı ve kas kaybı, VKİ'ın vücut yağ içeriğini düşük tahmin etmesine neden olabilir</h5>
              </div>

              <div className='box-card muscleBox'>
                <div className="flex-logo">
                  <img src={muscle} alt="muscle" />
                  <h4>Kas</h4>
                </div>
                <h5>VKİ, kas ile yağı ayırt etmediği için, kaslı bireyleri aşırı kilolu veya obez olarak yanlış sınıflandırabilir.</h5>
              </div>

              <div className='box-card pregBox'>
                <div className="flex-logo">
                  <img src={pregnan} alt="pregnancy" />
                  <h4>Hamilelik</h4>
                </div>
                <h5>Bekleyen anneler büyüyen bebekleri nedeniyle kilo alırlar. Hem anne hem de çocuk için sağlık risklerini en aza indirmek için sağlıklı bir hamilelik öncesi BMI'ını korumak önerilir.</h5>
              </div>

              <div className='box-card raceBox'>
                <div className="flex-logo">
                  <img src={race} alt="race" />
                  <h4>Irk</h4>
                </div>
                <h5>Bazı sağlık sorunları, bazı Siyah ve Asyalı kökenli bireyleri diğerlerinden daha düşük VKİ'lerde etkileyebilir. Daha fazla bilgi almak için, bu konuyu doktorunuz veya pratisyen hemşirenizle konuşmanız önerilir.</h5>
              </div>
            </div>
        </section>
      </div>
    </>
  )
}

export default App
