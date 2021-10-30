import React, {  useState, useEffect } from "react";
import axios from "axios";
import AdminhistoriqueSamy from "./AdminHistoriqueSamy";

const AddHistorique = () => {
  const [HistoriqueData, setHistoriqueData] = useState([]);
  const [nom_societe, setNom_societe] = useState("");
  const [nom_postulant, setNom_postulant] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3000/api/apply/historique")
      .then((res) => setHistoriqueData(res.data.historique));
  };


  const HandleSubmit = (e) => {
    e.preventDefault();

      axios
        .post("http://localhost:3000/api/apply/historique", {
          nom_societe,
          nom_postulant,
          message
        })
        .then((res) => {
          setNom_societe("");
          setNom_postulant("");
          setMessage("");
          setResponse(res.data.message)
         console.log(res)
         window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data.error);
        })
      }

  return (
    <div>
    <div className="formm">
      <h2>Add  Historique </h2>
      <form onSubmit={(e) => HandleSubmit(e)}>

      <input
         onChange={(e) => setNom_societe(e.target.value)}
         type="text" name="Nom_societe" placeholder="Nom de la société" 
         value={nom_societe}/>

        <input
          onChange={(e) => setNom_postulant(e.target.value)}
          type="text"
          placeholder="Nom_Postulant"
          value={nom_postulant} />


        <input
        onChange={(e) => setMessage(e.target.value)}
         type="text" name="message" placeholder="message" 
         value={message}/>

            
        <input type="submit" value="Envoyer" />
      </form>
      
     <span style={{color: "green"}}>{response}</span>
     </div>
     <ul>
     {HistoriqueData
       .sort((a, b) => b.createdAt - a.createdAt)
       .map((historique) => (
         <AdminhistoriqueSamy key={historique.id} historique={historique} />
       ))}
   </ul>
    </div>
  );
};
export default AddHistorique;

