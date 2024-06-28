import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CardPet from "../components/CardPet";
import dataPet from "../dataPet";

function Homepage() {
  // const filteredData = dataPet.filter(
  //   (item) => item.age === 1 && item.location === "Surabaya"
  // );
  const cards = dataPet.map((item) => {
    return <CardPet key={item.id} item={item} />;
  });
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center min-h-screen container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cards}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
