

import axios from 'axios';

import { useEffect, useState } from "react";

const useLocation =  (location) => {

    const [prediction, setPrediction] = useState(0);
    const [predictionLoading, setpredictionLoading] = useState(true);
    const [predictionError, setpredictionError] = useState("");


    let  config = {
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${location}&key=AIzaSyADtYqSYIWJ5ZBU160TZH6rkLkhK_vboh8`,
        method: "GET",
        mode: "cors",
        headers: { 
            'Content-Type': 'json',
            'Access-Control-Allow-Origin': '*'
        }

    };

    useEffect(() => {
        const fetchData = async () => { 
            try {
                const resp = await axios.get(config.url);
                const data = await resp?.data;
        
                setPrediction(data);
                setpredictionLoading(false);
              } catch (error) {
                setpredictionError(error);
                setpredictionLoading(false);
              }
        }
    

        fetchData()

      }, [location]);
    
   return [ prediction, predictionLoading, predictionError ];

}


export default useLocation;