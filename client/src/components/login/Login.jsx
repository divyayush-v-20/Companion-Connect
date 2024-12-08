import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const navigate = useNavigate();


    const fetchUserDetails = async() => {
      let email = localStorage.getItem("currentUserEmail");
      var fetchResponse = await fetch(`http://localhost:8000/user/${email}`,{
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("authToken")
        }
      });
      if(fetchResponse.ok){
        const userData = await fetchResponse.json();
        console.log(userData);
        navigate("/home");
        localStorage.setItem("currentUserName", userData[0].name);
        localStorage.setItem("currentUserCity", userData[0].city);
        localStorage.setItem("currentUserState", userData[0].stateIso2);
        // console.log(userData[0].name + " " + userData[0].city + " " + userData[0].stateIso2)
      }
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
          let curr_time = new Date();
          localStorage.setItem("authToken", loginData.token);
          localStorage.setItem("currentUserEmail", userData.email);
          localStorage.setItem("loginTime", curr_time);
          alert("Login Successful");
          fetchUserDetails();
        }
        else{
          alert("Authorization Error");
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
              required
              className="w-full p-2 border rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
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
                
                {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-600" /> : <EyeIcon className="h-5 w-5 text-gray-600" />}
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