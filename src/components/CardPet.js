import React, { useState } from "react";
import MatchPopup from "./MatchPopup";

export default function CardPet(pet) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
  };

  return (
    <div className="rounded-xl shadow-lg mr-4 mb-4">
      <div className="p-5 flex flex-col">
        <div className="rounded-xl over">
          <img src={`../images/${pet.item.image}`} alt="Image" />
        </div>
        <h3 className="text-2xl md:text-3xl font-medium mt-3">
          {pet.item.name}, {pet.item.age}th
        </h3>
        <div className="flex justify-between items-stretch text-sm text-slate-600">
          <p>{pet.item.location}</p> <p>{pet.item.ras}</p>
        </div>
        <p className="text-slate-500 mt-3">{pet.item.description}</p>
      </div>
      <div className="m-auto mb-4 mt-0 flex justify-center">
        <button
          className="w-14 h-14 mr-4 transition hover:scale-110 "
          onClick={toggleModal}
        >
          <img
            src="../images/love.svg"
            alt="Love Icon"
            className="w-full h-full object-cover rounded-full"
          />
        </button>
        <button className="w-14 h-14  transition hover:scale-110">
          <img
            src="../images/cancel.svg"
            alt="Cancel Icon"
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>
      <MatchPopup toggleModal={toggleModal} modal={modal} />
    </div>
  );
}
