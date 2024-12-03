import { Link } from "react-router-dom";
import "./Login.css"
import { useState, useEffect } from "react";
export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

    useEffect(() => {
      if(loginSuccess){
        fetchUserDetails();
      }
    }, [loginSuccess])

    const fetchUserDetails = async() => {
      let email = localStorage.getItem("currentUserEmail");
      var fetchResponse = await fetch(`http://localhost:8000/user/${email}`,{
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("authToken")
        }
      });
      let userDetails = await fetchResponse.json();
      console.log(userDetails);
    }

    const submitHandler = async (e) => {
      e.preventDefault();
      const userData = {
        email, 
        password
      }
      console.log(userData);
      if(userData.email && userData.password){
        const loginRes = await fetch("http://localhost:8000/user/login", {
          method: "POST",
          body: JSON.stringify({...userData}),
          headers: {
            "Content-Type": "application/json"
          },
        });
        if(loginRes.ok){
          const loginData = await loginRes.json();
          console.log(loginData);
          localStorage.setItem("authToken", loginData.token);
          localStorage.setItem("currentUserEmail", userData.email);
          alert("Login Successful");
          fetchUserDetails();
        }
      }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md" id = "auth">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form className="space-y-4" onSubmit={submitHandler}>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-2 border rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2 pr-10 border rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
                style={{
                  padding: 0,
                  margin: 0,
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>


            <button 
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md"
            >
              Login
            </button>
            <p>Don&apos;t have an account? <Link to = "/signup" className = "text-blue-900 underline">Signup</Link></p>
          </form>
        </div>
      );
}