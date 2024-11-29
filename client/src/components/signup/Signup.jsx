import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../login/Login.css";
import { statesToIso2 } from "../../utils/StateISO2";
import citiesData from "../../utils/StateCityData.json";

export default function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]); 
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      alert("Passwords don't match!");
    }
    
    const stateISO2 = statesToIso2[state];
    
    const userData = {
      name,
      email,
      password,
      stateISO2,
      city,
    };

    console.log(userData);
    
    if(userData.name && userData.email && userData.password && userData.stateISO2 && userData.city){
        var response = await fetch("http://localhost:8080/user", {
          method: "POST",
          body: JSON.stringify({...userData}),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if(response.ok && (response.status == "201" || response.status == "200")){
          setShowSuccess(true);
          setShowFailure(false);
        }
        else{
          setShowFailure(true);
          setShowSuccess(false);
        }
    }
    else{
      setShowFailure(true);
    }
  };


  useEffect(() => {
    if (state) {
      const stateCities = citiesData[state] || [];
      setCities(stateCities); 
    }
  }, [state]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md" id="auth">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form className="space-y-4" onSubmit={submitHandler}>
        <input 
          type="text" 
          placeholder="Full Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded-md"
        />

        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select State</option>
          {Object.keys(statesToIso2).map((stateName) => (
            <option key={stateName} value={stateName}>
              {stateName}
            </option>
          ))}
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select City</option>
          {cities.length > 0 ? (
            cities.map((cityName, index) => (
              <option key={index} value={cityName}>
                {cityName}
              </option>
            ))
          ) : (
            <option>No cities available</option>
          )}
        </select>

        <button 
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md"
        >
          Sign Up
        </button>
        <p>Already have an account? <Link to="/login" className="text-blue-900 underline">Login</Link></p>
      </form>
    </div>
  );
}
