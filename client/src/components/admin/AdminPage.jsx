import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

export default function AdminPage() {
  const [petData, setPetData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (isAdmin === false) {
      getAdminInfo();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin === true) {
      fetchPetRequests();
    }
  }, [isAdmin]);

  const getAdminInfo = async () => {
    const email = localStorage.getItem("currentUserEmail");
    console.log(email);

    const dbRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/auth/${email}`, {
      method: "GET",
    });

    if(dbRes.status == 403){
      alert("Unauthorized Access");
      navigate("/home");
      return;
    }

    const auth = await dbRes.json();
    console.log(auth.isAdmin);

    if (auth.isAdmin === true) {
      setIsAdmin(true);
    }
  };

  const fetchPetRequests = async () => {
    const dbRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/pets`, {
      method: "GET",
    });

    if (dbRes.ok) {
      const data = await dbRes.json();
      setPetData(data);
    }
  };

  const handleApprove = async (id) => {
    const dbRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/pets/approve/${id}`, {
        method: 'POST',
    })
    if(dbRes.ok){
        console.log("Updated Successfully");
        fetchPetRequests();
    }
  };

  const handleReject = async (id) => {
    console.log('inside reject method');

    const dbRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/pets/reject/${id}`, {
        method: 'POST',
    })
    if(dbRes.ok){
      console.log("Updated Successfully");
      fetchPetRequests();
    }
  };

  const imgUrl = (img) => {
    return `${baseUrl}/${img}`;
  }

  return (
    <div className="flex flex-col min-h-screen bg-orange-100">
    <Navbar />
    <main className="flex-grow p-6">
      <h1 className="text-4xl font-bold text-center text-orange-700 mb-8">
        Admin Page
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {petData.map((pet, index) => (

          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <img src={imgUrl(pet.image)} className="w-full h-auto max-h-48 object-contain rounded-t-lg" alt="" />
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              {pet.name}
            </h3>
            <p className="text-gray-700">
              <strong>Breed:</strong> {pet.breed}
            </p>
            <p className="text-gray-700">
              <strong>Age:</strong> {pet.age} years
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong> {pet.city}, {pet.state}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Description:</strong> {pet.description}
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => handleApprove(pet._id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(pet._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
    <footer className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-center py-4">
      <p>© 2024 CompanionConnect. All rights reserved.</p>
    </footer>
  </div>
  );
}
