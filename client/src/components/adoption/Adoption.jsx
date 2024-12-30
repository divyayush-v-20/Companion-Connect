import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { statesToIso2 } from "../../utils/StateISO2";
import citiesData from "../../utils/StateCityData.json";
import { useNavigate } from "react-router-dom";


const GiveForAdoption = () => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const currentUserEmail = localStorage.getItem("currentUserEmail");
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(age <= 0){
      alert("Invalid Age Entered!");
      return;
    }

    if (!image) {
      alert("Please upload an image for the pet.");
      return;
    }

    const stateIso2 = statesToIso2[state];
    const petData = {
      name,
      breed,
      gender,
      age,
      description,
      stateIso2,
      city,
      currentUserEmail
    };

    const formData = new FormData();
    Object.keys(petData).forEach((key) => {
      formData.append(key, petData[key]);
    });

    formData.append('image', image);

    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pet/upload-pet`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log(result);
      if(response.ok && result){
        alert("Pet data saved successfully!");
        navigate("/home");
      }
    }
    catch(err){
      console.log("Error uploading data: ", err);
    }


    // Reset all fields
    setName("");
    setBreed("");
    setGender("");
    setAge("");
    setDescription("");
    setImage(null);
    setPreviewImage(null);
    setState("");
    setCity("");
  };

  useEffect(() => {
    if (state) {
      const stateCities = citiesData[state] || [];
      setCityList(stateCities);
    }
  }, [state]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">
          Give Your Pet for Adoption
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto"
        >
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Pet&apos;s Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter the pet's name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Breed
            </label>
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter the pet's breed"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select State</option>
              {Object.keys(statesToIso2).map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              City
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select City</option>
              {cityList.length > 0 ? (
                cityList.map((cityName, index) => (
                  <option key={index} value={cityName}>
                    {cityName}
                  </option>
                ))
              ) : (
                <option>No cities available</option>
              )}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Age(in years)
              <p>If the pet is under 1 year in age, enter 1 and provide the exact age in the description</p>
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter the pet's age"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Provide a short description of your pet"
              rows="3"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-4 w-full h-auto object-contain rounded-lg"
              />
            )}

          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-400"
          >
            Submit
          </button>
        </form>
      </main>

      <footer className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-center py-4 mt-auto">
        <p>© 2024 CompanionConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GiveForAdoption;
