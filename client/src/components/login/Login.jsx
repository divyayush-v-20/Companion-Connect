import { Link } from "react-router-dom";
export default function Login(){
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form className="space-y-4">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-2 border rounded-md"
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-2 border rounded-md"
            />
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md"
            >
              Login
            </button>
            <p>Don't have an account? <Link to = "/signup" className = "text-blue-900 underline">Signup</Link></p>
          </form>
        </div>
      );
}