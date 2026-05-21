import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setMessage("Sending link...");
    setIsError(false);

    try {
      const response = await fetch(`http://127.0.0.1:8000/forgot-password?email=${email}`, {
        method: "POST",
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message);
        setIsError(false);
        setHasSent(true);
      } else {
        setMessage(data.detail || "Failed to send reset link.");
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setMessage("Network error. Please try again.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="container flex items-center justify-center min-h-screen px-4 sm:px-6 mx-auto">
        <form 
          onSubmit={handleForgot} 
          className="w-full max-w-md shadow-xs shadow-gray-600 border border-stone-200 bg-amber-50/30 p-6 md:p-9 rounded-3xl md:rounded-4xl"
        >
          <div className="flex flex-row justify-between items-center mt-2 md:mt-3 mb-6">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 sm:text-3xl">Reset Password</h1>
            <button onClick={() => navigate(-1)} className="bg-white text-center w-24 rounded-2xl h-14 relative text-black text-[15px] font-semibold group" type="button">Go Back
              <div className="bg-amber-100 rounded-xl h-[39px] w-1/3 flex items-center justify-center absolute -left-6 top-[9px] group-hover:w-[120px] group-active:w-[120px] z-10 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
                  <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000"></path>
                  <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000"></path>
                </svg>
              </div>
            </button>
          </div>

          <p className="text-xs md:text-sm text-gray-600 mb-6">
            Enter your email address and we'll send you a secure link to reset your password.
          </p>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 mx-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              autoFocus 
              required
              className="duration-400 block w-full py-3 text-sm md:text-base text-gray-700 bg-white border rounded-lg px-10 md:px-11 focus:border-amber-100 focus:ring-amber-200 focus:outline-none focus:ring focus:ring-opacity-40" 
              placeholder="Email address"
            />
          </div>

          <div className="mt-8">
            <button 
              type="submit"
              disabled={isSubmitting} 
              className={`w-full block text-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-opacity-50 ${
                isSubmitting 
                  ? "bg-stone-400 cursor-not-allowed" 
                  : "bg-stone-800 hover:bg-emerald-600"
              }`}
            >
              {isSubmitting 
                ? 'Sending...' 
                : hasSent 
                  ? 'Resend Reset Link' 
                  : 'Send Reset Link'
              }
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}