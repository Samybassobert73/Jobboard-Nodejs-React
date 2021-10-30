
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from "./Card"

const BodyAnnonce = () => {
    const [state, setstate] = useState([]);

    let token = localStorage.getItem('token');
    console.log(token);

useEffect(() => {
    axios.get(
        "http://localhost:3000/api/annonce/annonce"
        , {
            headers: {
              'Authorization': "bearer " + token
            }
          })
    .then((res) => setstate(res.data.announces));
},[]);
    
    return (
        <div>
            <ul>
              {state.map((announces) => (
                  <Card announces={announces} key={announces.id}/>
                  ))}
            </ul>
        </div>
    );
};

export default BodyAnnonce;