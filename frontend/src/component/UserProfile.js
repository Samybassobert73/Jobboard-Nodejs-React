import React, {useState, useEffect} from 'react';
import axios from 'axios';


const UserProfile = () => {
    const [state, setstate] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditContent] = useState("");


    let token = localStorage.getItem('token');
    console.log(token);

useEffect(() => {
    axios.get(
        "http://localhost:3000/api/user/me"
        , {
            headers: {
              'Authorization': "Bearer " + token
            }
          })
    .then((res) => setstate(res.data));
},[]);



const handleEdit = () => {

    const data = {
      bio: editedContent ? editedContent : state.bio,
    };
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
        <div>
            <ul>
              <li>{state.id}</li>
              <li>{state.username}</li>

              {isEditing ? (
        <textarea
          onChange={(e) => setEditContent(e.target.value)}
          autoFocus
          defaultValue={editedContent ? editedContent : state.bio}
        ></textarea>
        ) : (
            <p>{editedContent ? editedContent : state.bio}</p>
        )}

        <div className="btn-container">
        {isEditing ? (
          <button onClick={handleEdit} >Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        
        </div>
            </ul>
        </div>
        </div>
    );
};

export default UserProfile;