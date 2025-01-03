import { useState, useRef, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import citiesData from "../../utils/StateCityData.json";
import { statesToIso2 } from "../../utils/StateISO2";

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownerEmail, setOwnerEmail] = useState("");
  const overlayRef = useRef(null);
  const filterPanelRef = useRef(null);
  const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;

  useEffect(() => {
    const initialData = async () => {
      try {
        const city = localStorage.getItem("currentUserCity");
        if (!city) {
          console.log("No city found in localStorage");
          setIsLoading(false);
          return;
        }
        const serverRes = await fetch(`${baseUrl}/pet/${city}`, {
          method: "GET",
        });
        if (serverRes.ok) {
          const petData = await serverRes.json();
          console.log("Initial pet data:", petData);
          setPets(petData);
        } else {
          console.error("Failed to fetch initial data:", serverRes.status);
          setError("Failed to fetch pets. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError("An error occurred while fetching pets.");
      } finally {
        setIsLoading(false);
      }
    };

    initialData();
  }, []);

  const fetchPetData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log(`Fetching pet data for city: ${selectedCity}`);

      if (!selectedCity) {
        alert("Please provide the name of the city!");
        setIsLoading(false);
        return;
      }

      const serverRes = await fetch(`${baseUrl}/pet/${selectedCity}`, {
        method: "GET",
      });

      if (serverRes.ok) {
        const petData = await serverRes.json();
        console.log("Fetched pet data:", petData);
        setPets(petData);
      } else {
        console.error("Failed to fetch pet data:", serverRes.status);
        setError("Failed to fetch pets for the selected city.");
      }
    } catch (error) {
      console.error("Error fetching pet data:", error);
      setError("An error occurred while fetching pets.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedState) {
      const stateCities = citiesData[selectedState] || [];
      setCityList(stateCities);
    }
  }, [selectedState]);

  const handleOverlayClick = (e) => {
    if (overlayRef.current && !overlayRef.current.contains(e.target)) {
      setSelectedPet(null);
    }
  };

  const handleFilterPanelClick = (e) => {
    if (
      filterPanelRef.current &&
      !filterPanelRef.current.contains(e.target) &&
      !e.target.closest("button")
    ) {
      setIsFilterOpen(false);
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

  useEffect(() => {
    if (isFilterOpen) {
      document.addEventListener("mousedown", handleFilterPanelClick);
    } else {
      document.removeEventListener("mousedown", handleFilterPanelClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleFilterPanelClick);
    };
  }, [isFilterOpen]);

  const HandleImageUrl = (imgId) => {
    return `${baseUrl}/${imgId}`;
  };

  const handleResetFilters = () => {
    setSelectedState("");
    setSelectedCity("");
    setCityList([]);
    setPets([]);
    setIsFilterOpen(false);
    const city = localStorage.getItem("currentUserCity");
    if (city) {
      setSelectedCity(city);
      setCityList(citiesData[city] || []);
      setTimeout(fetchPetData, 0);
    }
  };

  const handleAdopt = (pet) => () => {
    setSelectedPet(pet);
    getOwnerInfo(pet.owner);
  }

  const getOwnerInfo = async (ownerId) => {
    const serverRes = await fetch(`${baseUrl}/pet/owner/${ownerId}`, {
      method: 'GET',
    })
    const data = await serverRes.json();
    console.log('owner data: ', data.email);
    setOwnerEmail(data.email);
  }

  const FilterContent = () => (
    <>
      <h2 className="text-xl font-bold text-orange-500 mb-4">Filters</h2>
      <div className="mb-6">
        <label className="block text-gray-600 mb-2 font-semibold">State</label>
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
          }}
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
      <div className="mb-6">
        <label className="block text-gray-600 mb-2 font-semibold">City</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cityList.length > 0 ? (
            cityList.map((cityName, index) => (
              <option key={index} value={cityName}>
                {cityName}
              </option>
            ))
          ) : (
            <option value="">No cities available</option>
          )}
        </select>
      </div>
      <button
        className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-400 mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={fetchPetData}
        disabled={isLoading || !selectedCity}
      >
        {isLoading ? "Loading..." : "Apply Filters"}
      </button>
      <button
        onClick={handleResetFilters}
        className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-400"
        disabled={isLoading}
      >
        Reset Filters
      </button>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex flex-1 relative pt-16">
        <aside className="hidden lg:block sticky top-20 bg-white w-1/4 p-6 border-r border-gray-200 h-[calc(100vh-5rem)]">
          <FilterContent />
        </aside>

        <button
  className="lg:hidden fixed bottom-10 left-4 z-40 bg-gray-200 text-orange-500 p-3 rounded-full shadow-lg hover:bg-gray-300 hover:text-orange-600"
  onClick={() => setIsFilterOpen(!isFilterOpen)}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 12.414V20a1 1 0 01-.447.894l-4 2A1 1 0 017 21v-8.586l-6.707-6.707A1 1 0 010 6V4a1 1 0 011-1z"
    />
  </svg>
</button>


        <div
          className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          ref={filterPanelRef}
        >
          <div className="p-6 pt-20">
            <FilterContent />
          </div>
        </div>

        <main className="flex-1 p-6">
          <section>
            <h1 className="text-3xl font-bold text-orange-500 mb-6">
              Available Pets
            </h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {pets.length === 0 ? (
                  <div className="col-span-full text-center text-gray-500 py-8">
                    No pets available in this location.
                  </div>
                ) : (
                  pets.map((pet) => (
                    <div
                      key={pet.id}
                      className="bg-white rounded-lg shadow-md p-4 transform hover:scale-105 transition duration-200"
                    >
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-full h-auto max-h-48 object-contain rounded-t-lg"
                        onError={(e) => {
                          e.target.src = "/placeholder-pet-image.jpg";
                          e.target.onerror = null;
                        }}
                      />
                      <div className="mt-4 text-center">
                        <h3 className="text-xl font-semibold text-orange-500">
                          {pet.name}
                        </h3>
                        <p className="text-gray-600 mt-1">Breed: {pet.breed}</p>
                        <p className="text-gray-600 mt-1">City: {pet.city}</p>
                        <p className="text-gray-600 text-sm mt-1">
                          Description: {pet.description}
                        </p>
                        <button
                          className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
                          onClick={handleAdopt(pet)}
                        >
                          Adopt Me
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>
        </main>
      </div>

      {selectedPet && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div
            ref={overlayRef}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              {selectedPet.name}
            </h2>
            <p className="mb-2">
              <strong>Breed:</strong> {selectedPet.breed}
            </p>
            <p className="mb-2">
              <strong>Gender:</strong> {selectedPet.gender}
            </p>
            <p className="mb-2">
              <strong>Description:</strong> {selectedPet.description}
            </p>            
            <p className = "mb-2">
              <strong>Owner Contact:</strong>  {ownerEmail}
            </p>

          </div>
        </div>
      )}

      <footer className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-center py-4 mt-auto text-sm sm:text-base">
        <p>© 2024 CompanionConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
