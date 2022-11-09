import { useState, useEffect} from 'react';
import './App.css';
import useSimple from './hooks/useSimple';
import useLocation from './hooks/use-location';


function App() {

  const fuelExpEst = {estDistance: 0, expAvg:0, avgFuelCost:0, originPrediction: [], origin:'', destiationPrediction:[], destiation:'', requiredFuel: 0, roundTrip: false,fuelCost:0};

  const [fuleExp, setFuelExp] = useState(fuelExpEst);

  const {distance, loading, error} =  useSimple(fuleExp.origin, fuleExp.destiation);

  const [prediction, predictionLoading, predictionError] =  useLocation(fuleExp.origin);
  let [predictionDestiation, predictionDestiationLoading, predictionDestiationError] =  useLocation(fuleExp.destiation);


 
  const CalculateExp = async (e) => {
    if (e && e.preventDefault) { e.preventDefault(); }
    let requiredFuel =  (fuleExp.roundTrip) ? distance*2/fuleExp.expAvg : distance/fuleExp.expAvg;
    let fuelCost =  requiredFuel*fuleExp.avgFuelCost;
        setFuelExp(  (preState) => {
          return{
          ...preState,
          estDistance: distance,
          requiredFuel:  requiredFuel, 
          fuelCost: fuelCost,
          }
        })


    // let  distance = useDistance(fuleExp.origin, fuleExp.destiation);

    // await distance.then(y => {
    //   let eDistance = (y.rows[0].elements[0].distance.value)/1000;
    //   return (fuleExp.roundTrip) ? eDistance*2 : eDistance;
      
    // }).then( z => {
    //     let requiredFuel =  (z/fuleExp.expAvg);
    //     let fuelCost =  requiredFuel*fuleExp.avgFuelCost;
    //     setFuelExp(  (preState) => {
    //       return{
    //       ...preState,
    //       estDistance: z,
    //       requiredFuel:  requiredFuel, 
    //       fuelCost: fuelCost,
    //       }
    //     })
    // }).catch((e) => {
    //   console.error(e); // "oh, no!"
    // });
  }



  
 let distanceEstChangeHandler = (e) => {
  setFuelExp( (preState)=> {return {
    ...preState,
    estDistance: e.target.value,
    }});
  }

  let originChangeHandler = (e) => {
    setFuelExp( (preState)=> {return {
      ...preState,
      origin: e.target.value,
      originPrediction:prediction.predictions
    }});
  }

  let destiationChangeHandler = (e) => {
    
    setFuelExp( (preState)=> {return {
      ...preState,
      destiation: e.target.value,
      destiationPrediction:predictionDestiation.predictions
    }});
  }

  let expAvgChangeHandler = (e) => {
    setFuelExp( (preState)=> {return {
      ...preState,
      expAvg: e.target.value,
      }});
  }

  let avgFuelCostChangeHandler = (e) => {
    setFuelExp( (preState)=> {return {
      ...preState,
      avgFuelCost: e.target.value,
      }});
  }

  let roundTripChangeHandler = (e) => {
    setFuelExp( (preState)=> {return {
      ...preState,
       roundTrip: !fuleExp.roundTrip,
      }});

     
  }

  let setOriginfromPrediction = (pOrigin) => {
    setFuelExp( (preState)=> {return {
      ...preState,
      origin: pOrigin,
      
    }});
  }

 let setDestiationfromPrediction = (pDestination) => {
    setFuelExp( (preState)=> {return {
      ...preState,
      destiation: pDestination,
      
    }});
  }

  useEffect(() => {
    

    return () => {

    }
  }, [fuleExp.roundTrip])
console.log(predictionLoading);

  return (
    <div className="App">
      <div className="container card mt-5 py-3">
        <div className="row">
          <div className="col-md-12">
            <h2 className='display-4 mb-5'>Get fuel Expenses for your trip</h2>
          </div>
        </div>

        {fuleExp.destiation}

        {loading && error && <div className="spinner-border" role="status">
  <span className="visually-hidden">Loading...</span>
</div>}
        
        <form onSubmit={CalculateExp}>
          <div className='row justify-content-center mb-3'>
            <div className="col-auto">
              <div className='form-label'>
                <label> Enter Estimated Distance &nbsp; </label>
              </div>
            </div>
            <div className="col-auto">
              <div className="">
                <input type="text" name="estDistance" value={fuleExp.estDistance} onChange={distanceEstChangeHandler}/>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12 mb-3'>
              <h5>OR</h5>
            </div>
            
            <div className="col-md-6 mb-3">
              <div className='row justify-content-end'>
                <div className='col-auto'>
                  <label className='form-label'> Enter your location</label>
                </div>
                <div className='col-auto'>
                  <div className="">
                    <input type="text" name="originLocation" value={fuleExp.origin} onChange={originChangeHandler}/>
                  </div>
                <div>
                  <ul>
                    {!predictionLoading &&
                      fuleExp.originPrediction.map( (x) => {
                       return <li onClick={() => setOriginfromPrediction(x.description)}>{x.description }</li>
                      })
                      }
                    
                  </ul>
                </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className='row justify-content-start'>
                <div className='col-auto'>
                  <label> Enter destination location</label>
                </div>
                <div className='col-auto'>
                <input type="text" name="destinationLocation" value={fuleExp.destiation} onChange={destiationChangeHandler}/>
                </div>
                <div>
                  <ul>
                    {!predictionDestiationLoading &&
                      fuleExp.destiationPrediction.map( (x) => {
                       return <li onClick={() => setDestiationfromPrediction(x.description)}>{x.description }</li>
                      })
                      }
                    
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className='row justify-content-end'>
                <div className='col-auto'>
                  <label>your expected avarage</label>
                </div>
                <div className='col-auto'>
                  <input type="text" name="expAvg" value={fuleExp.expAvg} onChange={expAvgChangeHandler}/>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className='row justify-content-start'>
                <div className='col-auto'>
                  <label>your expected avarage fuel cost</label>
                </div>
                <div className='col-auto'>
                  <input type="text" name="expAvgFuelCost" value={fuleExp.avgFuelCost} onChange={avgFuelCostChangeHandler}/>
                </div>
              </div>
            </div>


            <div className="col-md-12 mb-3">
              <div className='row justify-content-center'>
                <div className='col-auto'>
                <label htmlFor="Roundtrip"> Round Trip </label>
                </div>
                <div className='col-auto'>
                  <input type="checkbox"id="Roundtrip"  name="roundTrip" value={fuleExp.roundTrip} onChange={roundTripChangeHandler}/>
                </div>
              </div>
            </div>


            <div className="col-md-12 mt-5 mb-5">
              <button className="btn btn-lg btn-primary" > Calculate </button>
            </div>
          </div>
          </form>



         

          <div className='row'>
            <div className='col-md-12'>
              <h4>You required total fuel to complete this Journey is
                <br/> {fuleExp.requiredFuel.toFixed(2)} ltr your fuel cost {fuleExp.fuelCost.toFixed(2)}
              </h4>
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
