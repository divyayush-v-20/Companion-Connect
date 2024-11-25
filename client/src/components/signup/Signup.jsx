export default function Signup(){
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full p-2 border rounded-md"
            />
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
            <input 
              type="password" 
              placeholder="Confirm Password" 
              className="w-full p-2 border rounded-md"
            />
            <button 
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-md"
            >
              Sign Up
            </button>
          </form>
        </div>
      );
}