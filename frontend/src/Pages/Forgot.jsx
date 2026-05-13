import { useState } from 'react';

export default function Forgot() {
  const [email, setEmail]=useState('');
  const [message, setMessage]=useState('');
  const handleForgot=async(e)=>{
    e.preventDefault();
    try{
      const response=await fetch(`http://127.0.0.1:8000/forgot-password?email=${email}`, {
        method: "POST",
      });
      const data=await response.json();
      setMessage(data.message);
    } catch(error){
      console.error(error);
      setMessage("try again.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-20 p-10">
      <div className="bg-white p-8 rounded shadow-md w-96 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter email to reset your password.
        </p>

        <form onSubmit={handleForgot} className="flex flex-col gap-4">
          <input  type="email"  placeholder="Enter your email"  required className="border p-2 rounded" onChange={(e) => setEmail(e.target.value)}/>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-green-600 font-bold text-center">{message}</p>}
      </div>
    </div>
  );
}