import React from "react";
import axios from "axios";

const DeleteHistorique = ({id}) => {

 


  const handleDelete = () => {
    

    axios.delete("http://localhost:3000/api/apply/" + id );
    window.location.reload();
  };

  return (
    <button
    onClick={() => {
      if (window.confirm("Voulez-vous supprimer cet article ?")) {
        handleDelete();
      }
    }}
    >
      Supprimer
    </button>
  );
};

export default DeleteHistorique;