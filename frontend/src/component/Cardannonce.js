import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DeleteAnnonce from './DeleteAnnonce';

const Cardannonce = () => {
    const [state, setState] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditContent] = useState("");




useEffect(() => {

    axios.get(
        "http://localhost:3000/api/annonce/annonce"
    )
    .then((res) => {
        console.log(res.data.announces);
        setState(res.data.announces);
    });
 },[]); 
 
    /*const handleEdit = () => {
        const data = {
          intitule: announces.intitule,
          description: editedContent ? editedContent : announces.description,
          createdAt: announces.createdAt,
        };
    }
    
        axios.put("http://localhost:3004/articles/" + article.id, data).then(() => {
      setIsEditing(false);
    });
  };
*/



    return (
        <div>
            <div>
                <ul>
                    {state.map((announces) => (
                        <div className="list"> 
                            <div className="headcard">
                                <ul>
                                    <li> Intitule:  {announces.intitule} </li>
                                    <li> SKill: {announces.skill} </li>
                                    <li> Salaire:  {announces.salaire} </li>
                                    <li> Description: {announces.description} </li>
                                    <li> Lieu: {announces.lieu} </li>
                                    <li> Contrat: {announces.contrat} </li>
                                    <li> Réferent: {announces.referent} </li>
                                </ul>
                            </div>  
                            <div className="btn-container">
                                {isEditing ? (
                                <button >Valider</button>
                                ) : (
                                <button onClick={() => setIsEditing(true)}>Edit</button>
                                )}
                                <DeleteAnnonce/>
                            </div>
                            
                        </div>
                        
                    ))}
                </ul>
                
            </div>
        </div>
    );
};

export default Cardannonce;