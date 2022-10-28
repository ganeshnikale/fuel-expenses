

import axios from 'axios';

import { useEffect, useState } from "react";

const useSimple =  (origin, destination) => {

    const [distance, setDistance] = useState(0);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState("");


    let  config = {
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=imperial&key=AIzaSyADtYqSYIWJ5ZBU160TZH6rkLkhK_vboh8`,
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
        
                setDistance((data.rows[0].elements[0].distance.value)/1000);
                setloading(false);
              } catch (error) {
                seterror(error);
                setloading(false);
              }
        }
    

        fetchData()

      }, [origin, destination]);
    
   return { distance, loading, error };

}


export default useSimple;