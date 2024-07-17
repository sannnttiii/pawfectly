import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [petTypeIsDog, setPetTypeIsDog] = useState(true);
  const [image, setImage] = useState(null);
  const [petBreeds, setPetBreeds] = useState(
    petTypeIsDog ? "golden" : "persian"
  );
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");

  const id = parseInt(localStorage.getItem("userID"));
  const navigate = useNavigate();

  useEffect(() => {
    const petType = localStorage.getItem("petType");
    if (petType === "cat") {
      setPetTypeIsDog(false);
    } else {
      setPetTypeIsDog(true);
    }
  }, []);

  const handleProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("pet_breeds", petBreeds);
    formData.append("gender", gender);
    formData.append("name", name);
    formData.append("age", age);
    formData.append("city", city);
    formData.append("bio", bio);
    formData.append("id", id);

    formData.forEach((value, key) => {
      console.log(key + " " + value);
    });
    try {
      const response = await fetch("http://localhost:8080/api/setProfile", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/homepage");
        console.log("Update profile success");
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Error update:", error);
    }
  };

  useEffect(() => {
    setPetBreeds(petTypeIsDog ? "golden" : "persian");
  }, [petTypeIsDog]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setImage(files[0]);
    } else if (name === "petBreeds") {
      setPetBreeds(value);
    } else if (name === "gender") {
      setGender(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "age") {
      setAge(value);
    } else if (name === "city") {
      setCity(value);
    } else if (name === "bio") {
      setBio(value);
    }
    console.log("name ", bio, name, image, petBreeds, gender, age, city);
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-200">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray w-4/5">
          <h1 className="text-4xl font-semibold">Pet's Profile</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Tell us more about your paw-friend!
          </p>
          <form onSubmit={handleProfile}>
            <div className="mt-8">
              <input type="hidden" name="id" value={id} />
              <label className="text-lg font-medium" htmlFor="petImage">
                Pet Image (Ratio 3:4)
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="w-full border-2 border-gray-100 rounded-xl p-4 bg-transparent"
                onChange={(e) => handleChange(e)}
              />
              <label className="text-lg font-medium" htmlFor="petType">
                Pet Breeds
              </label>

              <select
                id="petBreeds"
                name="petBreeds"
                className="w-full border-2 border-gray-100 rounded-xl p-4 bg-transparent"
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select pet breeds
                </option>
                {petTypeIsDog ? (
                  <>
                    <option value="golden">Golden Retriever</option>
                    <option value="bordercollie">Border Collie</option>
                    <option value="labrador">Labrador Retriever</option>
                    <option value="poodle">Poodle</option>
                    <option value="shihtzu">Shih Tzu </option>
                    <option value="beagle">Beagle</option>
                    <option value="german">German Shepherd</option>
                    <option value="bulldog">Bulldog</option>
                    <option value="corgi">Corgi</option>
                    <option value="cihuahua">Cihuahua</option>
                    <option value="pomeranian">Pomeranian</option>
                    <option value="husky">Siberian Husky</option>
                    <option value="mix">Mix</option>
                    <option value="other">Other</option>
                  </>
                ) : (
                  <>
                    <option value="persian">Persian</option>
                    <option value="anggora">Anggora</option>
                    <option value="siam">Siam</option>
                    <option value="ragdoll">Ragdoll</option>
                    <option value="himalaya">Himalaya</option>
                    <option value="british">British Shorthair</option>
                    <option value="american">American Shorthair</option>
                    <option value="scottish">Scottish Fold</option>
                    <option value="mix">Mix</option>
                    <option value="other">Other</option>
                  </>
                )}
              </select>

              <label className="text-lg font-medium" htmlFor="gender">
                Gender
              </label>

              <select
                id="gender"
                name="gender"
                className="w-full border-2 border-gray-100 rounded-xl p-4 bg-transparent"
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <label className="text-lg font-medium">Name</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                type="text"
                placeholder="Enter your pet's name"
                name="name"
                onChange={handleChange}
              />
              <div>
                <label className="text-lg font-medium">Age</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  type="text"
                  placeholder="Enter your pet's age"
                  name="age"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-lg font-medium">City</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  type="text"
                  name="city"
                  placeholder="Enter the city your pet's live"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-lg font-medium">About me</label>
                <textarea
                  id="bio"
                  name="bio"
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter a brief description about your pet's personality, likes, hobby and etc"
                />
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  className=" w-full bg-orange-500 text-white text-lg font-bold py-3 rounded-xl hover:bg-orange-700"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className=" lg:flex h-full w-1/2 hidden relative items-center justify-center">
        {/* <div className="flex flex-col items-center justify-center h-full"> */}
        <div class="paw-print-1">
          <div class="pad large"></div>
          <div class="pad small-1"></div>
          <div class="pad small-2"></div>
          <div class="pad small-3"></div>
          <div class="pad small-4"></div>
        </div>

        <div class="paw-print-2">
          <div class="pad large"></div>
          <div class="pad small-1"></div>
          <div class="pad small-2"></div>
          <div class="pad small-3"></div>
          <div class="pad small-4"></div>
        </div>

        <div class="paw-print-3">
          <div class="pad large"></div>
          <div class="pad small-1"></div>
          <div class="pad small-2"></div>
          <div class="pad small-3"></div>
          <div class="pad small-4"></div>
        </div>

        <div class="paw-print-4">
          <div class="pad large"></div>
          <div class="pad small-1"></div>
          <div class="pad small-2"></div>
          <div class="pad small-3"></div>
          <div class="pad small-4"></div>
        </div>

        <div class="paw-print-5">
          <div class="pad large"></div>
          <div class="pad small-1"></div>
          <div class="pad small-2"></div>
          <div class="pad small-3"></div>
          <div class="pad small-4"></div>
        </div>

        <div class="paw-print-6">
          <div class="pad large"></div>
          <div class="pad small-1"></div>
          <div class="pad small-2"></div>
          <div class="pad small-3"></div>
          <div class="pad small-4"></div>
        </div>
        {/* <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div> */}
      </div>
    </div>
  );
}

export default Profile;
