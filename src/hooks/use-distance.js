

import axios from 'axios';

const useDistance = ( origin, destination) =>  {
    

    let  config = {
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=imperial&key=AIzaSyADtYqSYIWJ5ZBU160TZH6rkLkhK_vboh8`,
        method: "GET",
        mode: "cors",
        headers: { 
            'Content-Type': 'json',
            'Access-Control-Allow-Origin': '*'
        }

    };

    let data = axios(config).then( (response) => {
        return response.data;
     }).then( x =>{  return x});
    
     
    
    return data ;



}



export default useDistance