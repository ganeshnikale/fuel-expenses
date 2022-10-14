import { useState} from 'react';
import './App.css';


function App() {

    const fuleExpS = {requoredFuel: 0, fuelCost:0, fuelRate:0};

  const [fuleExp, setFuelExp] = useState(fuleExpS);

  const CalculateExp = (e) => {
    e.preventDefault();
   
    let estDistance = e.target.estDistance.value;
    let expAvg = e.target.expAvg.value;
    let expAvgFuelCost = Number(e.target.expAvgFuelCost.value);


    let requiredFuel = (estDistance/expAvg);

    let fuelCost = requiredFuel*expAvgFuelCost;
    
    const fuel = () => {
      return {...fuleExp, fuelRate:expAvgFuelCost, requoredFuel: requiredFuel, fuelCost: fuelCost};
    };


     setFuelExp(fuel());

     console.log(fuleExp);


  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Get fuel Expenses for your trip</h2>
          </div>
        </div>
        <form onSubmit={CalculateExp}>
          <div className='row'>

            <div className="col-md-6">
              <div className="form-control">
                <label> Enter Estimated Distance</label>
                <input type="text" name="estDistance"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-control">
                <label>your expected avarage</label>
                <input type="text" name="expAvg"/>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-control">
                <label>your expected avarage fuel cost</label>
                <input type="text" name="expAvgFuelCost"/>
              </div>
            </div>


            <div className="col-md-12">
              <button className="btn btn-primary" > calculate</button>
            </div>
          </div>
          </form>

          <div className='row'>
            <div className='col-md-12'>
            
            <h4> you required total fuel to complete this Journey is<br/> {fuleExp.requoredFuel.toFixed(2)} ltr your fuel cost {fuleExp.fuelCost.toFixed(2)}</h4>
          
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
