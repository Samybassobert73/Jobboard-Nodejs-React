import React, {useState} from "react";
import axios from "axios";
import DeleteHistorique from "./DeleteHistorique";

const AdminHistoriqueSamy = (props) => {
    const {historique} = props;

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditContent] = useState("");

    const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric", 
    });
    return newDate;
    };

    let token = localStorage.getItem('token');
    console.log(token);

    const handleEdit = () => {
        const data = {
          historiqueId : historique.id,
          message: editedContent ? editedContent : historique.message,
         
        };
console.log(data);
        const headers = {
          'Authorization': "Bearer " + token
        }

        axios.put("http://localhost:3000/api/apply/admin/",  data, {
        headers: headers
      })
    .then(() => {
      setIsEditing(false);
    });
  };
  
    return (
<div style={{ background: isEditing ? "#f3feff" : "white" }}> 
          <div >
          <p> {historique.nom_societe} </p> 
            <p> {historique.nom_postulant} </p> 
            <p> {historique.id}</p>  
            <em>Posté le {dateParser(historique.createdAt)}</em>
          </div>  
          {isEditing ? (
        <textarea
          onChange={(e) => setEditContent(e.target.value)}
          autoFocus
          defaultValue={editedContent ? editedContent : historique.message}
        ></textarea>
        ) : (
            <p>{editedContent ? editedContent : historique.message}</p>
        )}


        <div className="btn-container">
        {isEditing ? (
          <button onClick={handleEdit}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <DeleteHistorique id={historique.id} />
        </div>

          
        </div>
    )
}
export default AdminHistoriqueSamy;