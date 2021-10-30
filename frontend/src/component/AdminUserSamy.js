import React, {useState} from "react";
import axios from "axios";
import DeleteUser from "./DeleteUser";

const AdminUserSamy = (props) => {
    const {user} = props;

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
          bio: editedContent ? editedContent : user.bio,
          
        };
console.log(data);
        const headers = {
          'Authorization': "Bearer " + token
        }

        axios.put("http://localhost:3000/api/user/me/",  data, {
        headers: headers
      })
    .then(() => {
      setIsEditing(false);
    });
  };
  
    return (
<div style={{ background: isEditing ? "#f3feff" : "white" }}> 
          <div >
            <h2> {user.username} </h2>
            <h3> {user.id}  </h3> 
            <em>Posté le {dateParser(user.createdAt)}</em>
          </div>  
          {isEditing ? (
        <textarea
          onChange={(e) => setEditContent(e.target.value)}
          autoFocus
          defaultValue={editedContent ? editedContent : user.bio }
        ></textarea>
        ) : (
            <p>{editedContent ? editedContent : user.bio }</p>
        )}


        <div className="btn-container">
        {isEditing ? (
          <button onClick={handleEdit}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <DeleteUser id={user.id} />
        </div>

          
        </div>
    )
}
export default AdminUserSamy;