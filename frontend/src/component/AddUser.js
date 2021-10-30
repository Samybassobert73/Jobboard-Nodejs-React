import React, {  useState, useEffect } from "react";
import axios from "axios";
import AdminUserSamy from "./AdminUserSamy";

const Adduser = () => {
  const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [errorusername, setErrorusername] = useState(false);
  const [errorpass, setErrorpass] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");

const HandleSubmit = (e) => {
    e.preventDefault();

    const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;
   
  if(username.length >= 13 || username.length <= 4 ){setErrorusername(true) }
  else if(!PASSWORD_REGEX.test(password)) {setErrorpass(true) }
  
   else {

      axios
        .post("http://localhost:3000/api/user/register", {
          email,
          password,
          username,
        })
        .then((res) => {
          setErrorusername(false)
          setEmail("");
          setPassword("");
          setUsername("");
          setMessage("Vous etes bien enregistrer " + res.data.username)
          setErrorpass(false) 
          setResponse(res.data.message)
         console.log(res)
         window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setError(true) 
          setMessage(error.response.data.error)
        })
      }
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3000/api/user/user")
      .then((res) => setUserData(res.data.user));
  };


  return (
    <div>
    <div className="formm">
      <h2>Add  user </h2>
          <form onSubmit={(e) => HandleSubmit(e)}>

            <input
              onChange={(e) => setUsername(e.target.value)}
              style={{border: errorusername ? "1px solid red": ""}}
              type="text" name="username" placeholder="username" 
              value={username}
              />
            <span style={{color: errorusername ? "red": "black"}}>{errorusername && <p>veuiller ecrire un username entre 5 et 12 caractere</p>}</span>

            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
              value={email}
              />


              <input
                onChange={(e) => setPassword(e.target.value)}
                style={{border: errorpass ? "1px solid red": ""}}
                type="password" name="password" placeholder="password" 
                value={password}
                />
              <span style={{color: errorpass ? "red": "black"}}>{errorpass && <p>veuiller ecrire un pass entre 4 et 8 caractere</p>}</span>

            
          
            <input type="submit" value="Envoyer" />
          </form>
        <span style={{color: "green"}}>{response}</span>
    </div>
    <ul>
    {userData
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((user) => (
        <AdminUserSamy key={user.id} user={user} />
      ))}
  </ul>
   </div>
  );
};

export default Adduser;

