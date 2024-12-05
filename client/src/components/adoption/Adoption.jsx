import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const GiveForAdoption = () => {
  const[user, setUser] = useState({ name: "Divyayush" });
  const [petData, setPetData] = useState({
    name: "",
    breed: "",
    location: "",
    gender: "",
    description: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setPetData({ ...petData, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!petData.image) {
      alert("Please upload an image for the pet.");
      return;
    }
    console.log("Submitted Pet Data:", petData);
    alert("Pet submitted successfully for adoption!");

    setPetData({
      name: "",
      breed: "",
      location: "",
      gender: "",
      description: "",
      image: null,
    });
    setPreviewImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar user={user} onLogout={handleLogout}/>

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
              Pet's Name
            </label>
            <input
              type="text"
              name="name"
              value={petData.name}
              onChange={handleChange}
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
              name="breed"
              value={petData.breed}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter the pet's breed"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={petData.location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your location"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={petData.gender}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2 resize-none">
              Description
            </label>
            <textarea
              name="description"
              value={petData.description}
              onChange={handleChange}
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
                className="mt-4 w-full h-48 object-cover rounded-lg"
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
