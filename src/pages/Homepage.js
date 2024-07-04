import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CardPet from "../components/CardPet";
import dataPet from "../dataPet";
import Select from "react-select";

function Homepage() {
  const [petTypeIsDog, setPetTypeIsDog] = useState(true);

  useEffect(() => {
    const petType = localStorage.getItem("petType");
    if (petType === "isCat") {
      setPetTypeIsDog(false);
    } else {
      setPetTypeIsDog(true);
    }

    // console.log("Pet Type", petTypeIsDog);
  }, []);

  const options = petTypeIsDog
    ? [
        { value: "golden", label: "Golden Retriever" },
        { value: "bordercollie", label: "Border Collie" },
        { value: "labrador", label: "Labrador Retriever" },
        { value: "poodle", label: "Poodle" },
        { value: "shihtzu", label: "Shih Tzu" },
        { value: "beagle", label: "Beagle" },
        { value: "german", label: "German Shepherd" },
        { value: "bulldog", label: "Bulldog" },
        { value: "corgi", label: "Corgi" },
        { value: "chihuahua", label: "Chihuahua" },
        { value: "pomeranian", label: "Pomeranian" },
        { value: "husky", label: "Siberian Husky" },
        { value: "mix", label: "Mix" },
        { value: "other", label: "Other" },
      ]
    : [
        { value: "persian", label: "Persian" },
        { value: "anggora", label: "Anggora" },
        { value: "siam", label: "Siam" },
        { value: "ragdoll", label: "Ragdoll" },
        { value: "himalaya", label: "Himalaya" },
        { value: "british", label: "British Shorthair" },
        { value: "american", label: "American Shorthair" },
        { value: "scottish", label: "Scottish Fold" },
        { value: "mix", label: "Mix" },
        { value: "other", label: "Other" },
      ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChangeFilter = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const filteredData = selectedOption
    ? dataPet.filter(
        (item) =>
          item.isDog === petTypeIsDog && item.ras === selectedOption.value
      )
    : dataPet.filter((item) => item.isDog === petTypeIsDog);

  const cards = filteredData.map((item) => {
    return <CardPet key={item.id} item={item} />;
  });

  return (
    <div>
      <Navbar />
      <div className="w-1/6 m-6">
        <label htmlFor="filter">Filter Category: </label>
        <Select
          value={selectedOption}
          onChange={handleChangeFilter}
          options={options}
        />
      </div>
      <div className="flex items-center justify-center min-h-screen container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cards}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
