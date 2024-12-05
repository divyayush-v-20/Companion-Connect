import { useState, useRef, useEffect } from "react";
import Navbar from "../navbar/Navbar";

const HomePage = () => {
  const pets = [
    {
      id: 1,
      name: "Buddy",
      breed: "Golden Retriever",
      location: "New York",
      gender: "Male",
      description: "A friendly and active dog, great with kids.",
      image: "dog1.jpg",
    },
    {
      id: 2,
      name: "Luna",
      breed: "Siamese",
      location: "Los Angeles",
      gender: "Female",
      description: "A playful and curious cat, loves attention.",
      image: "cat1.jpg",
    },
    {
      id: 3,
      name: "Max",
      breed: "Beagle",
      location: "New York",
      gender: "Male",
      description: "An energetic and loyal dog, loves outdoor activities.",
      image: "dog2.jpg",
    },
  ];

  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPet, setSelectedPet] = useState(null); // For pop-up
  const [message, setMessage] = useState(""); // Message for contacting the owner
  const overlayRef = useRef(null);

  const filteredPets = pets.filter((pet) => {
    return (
      (!selectedBreed || pet.breed === selectedBreed) &&
      (!selectedLocation || pet.location === selectedLocation)
    );
  });

  const breeds = [...new Set(pets.map((pet) => pet.breed))];
  const locations = [...new Set(pets.map((pet) => pet.location))];

  const handleOverlayClick = (e) => {
    if (overlayRef.current && !overlayRef.current.contains(e.target)) {
      setSelectedPet(null);
    }
  };

  useEffect(() => {
    if (selectedPet) {
      document.addEventListener("mousedown", handleOverlayClick);
    } else {
      document.removeEventListener("mousedown", handleOverlayClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [selectedPet]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      <Navbar/>

      <div className="flex flex-1">
        <aside className="sticky top-16 bg-white w-full lg:w-1/4 p-6 border-r border-gray-200">
          <h2 className="text-xl font-bold text-orange-500 mb-4">Filters</h2>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2 font-semibold">Breed</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
            >
              <option value="">All Breeds</option>
              {breeds.map((breed) => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2 font-semibold">Location</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              setSelectedBreed("");
              setSelectedLocation("");
            }}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-400"
          >
            Reset Filters
          </button>
        </aside>

        <main className="flex-1 p-6">
          <section>
            <h1 className="text-3xl font-bold text-orange-500 mb-6">Available Pets</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredPets.map((pet) => (
                <div key={pet.id} className="bg-white rounded-lg shadow-md p-4 transform hover:scale-105 transition duration-200">
                  <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-semibold text-orange-500">{pet.name}</h3>
                    <p className="text-gray-600 mt-1">Breed: {pet.breed}</p>
                    <p className="text-gray-600 mt-1">Location: {pet.location}</p>
                    <button
                      className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
                      onClick={() => setSelectedPet(pet)}
                    >
                      Adopt Me
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {selectedPet && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div ref={overlayRef} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">{selectedPet.name}</h2>
            <p className="mb-2"><strong>Breed:</strong> {selectedPet.breed}</p>
            <p className="mb-2"><strong>Gender:</strong> {selectedPet.gender}</p>
            <p className="mb-4"><strong>Description:</strong> {selectedPet.description}</p>
            <button
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
              onClick={() => setMessage("")}
            >
              Contact the Owner
            </button>
            {message !== null && (
              <div className="mt-4">
                <textarea
                  className="w-full border border-gray-300 rounded p-2 resize-none"
                  rows="3"
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button
                  className="mt-2 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
                  onClick={() => {
                    alert(`Message sent: ${message}`);
                    setSelectedPet(null);
                  }}
                >
                  Send
                </button>
              </div>
            )}
            <button
              className="mt-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedPet(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-center py-4 mt-auto">
        <p>© 2024 CompanionConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
