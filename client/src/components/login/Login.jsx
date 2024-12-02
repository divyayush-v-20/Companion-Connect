import { Link } from "react-router-dom";
import "./Login.css"
import { useState, useEffect } from "react";
export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);

    // useEffect(() => {
    //   if(loginSuccess){
    //     fetchUserDetails();
    //   }
    // }, [loginSuccess])

    const submitHandler = async (e) => {
      e.preventDefault();
      const userData = {
        email, 
        password
      }
      console.log(userData);
      if(userData.email && userData.password){
        const loginResponse = await fetch("http://localhost:8000/user/login", {
          method: "POST",
          body: JSON.stringify({...userData}),
          headers: {
            "Content-Type": "application/json"
          },
        });
        if(loginResponse.ok){
          const loginResponseData = await loginResponse.json();
          localStorage.setItem("authToken", loginResponseData?.token);
          localStorage.setItem("loggedInUserEmail", userData.email);

          setLoginSuccess(true);
          alert("Login Successful");
        }
        else{
          alert("Login Failed");
        }
      }
      else{
        alert("Form is Invalid");
      }      
    };

    

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
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-2 border rounded-md"
              onChange = {(e) => setPassword(e.target.value)}
            />
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