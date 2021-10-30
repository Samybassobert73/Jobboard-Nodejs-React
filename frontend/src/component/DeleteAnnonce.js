import React from "react";
import axios from "axios";

const DeleteAnnonce = ({id}) => {

 


  const handleDelete = () => {
      

    axios.delete("http://localhost:3000/api/annonce/" + id );
    window.location.reload();
  };

  return (
    <button
    onClick={() => {
      if (window.confirm("Voulez-vous supprimer cet annonce ?")) {
        handleDelete();
      }
    }}
    >
      Supprimer
    </button>
  );
};

export default DeleteAnnonce;