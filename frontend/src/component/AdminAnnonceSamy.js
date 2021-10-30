import React, {useState} from "react";
import axios from "axios";
import DeleteAnnonce from "./DeleteAnnonce";

const AdminAnnonceSamy = (props) => {
    const {announces} = props;

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
          intitule : editedContent ? editedContent : announces.intitule,
          description: editedContent ? editedContent : announces.decription,
          announceId : announces.id
        };
console.log(data);
        const headers = {
          'Authorization': "Bearer " + token
        }

        axios.put("http://localhost:3000/api/annonce/admin/",  data, {
        headers: headers
      })
    .then(() => {
      setIsEditing(false);
    });
  };
  
    return (
<div style={{ background: isEditing ? "#f3feff" : "white" }}> 
          <div >
            <h3>{announces.intitule }</h3>
            <em>Posté le {dateParser(announces.createdAt)}</em>
          </div>  
          {isEditing ? (
        <textarea
          onChange={(e) => setEditContent(e.target.value)}
          autoFocus
          defaultValue={editedContent ? editedContent : announces.description }
        ></textarea>
        ) : (
            <p>{editedContent ? editedContent : announces.description }</p>
        )}


        <div className="btn-container">
        {isEditing ? (
          <button onClick={handleEdit}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <DeleteAnnonce id={announces.id} />
        </div>

          
        </div>
    )
}
export default AdminAnnonceSamy;