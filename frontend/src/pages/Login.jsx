import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    // State untuk menyimpan input
    const [email, setEmail] = useState('') ;
    const [password, setPassword] = useState('') ;
    const [error, setError] = useState('') ;
    const navigate = useNavigate();

    // Fungsi tombol login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('')

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email: email,
                password: password,
            });

            const { access_token } = response.data;

            localStorage.setItem('authToken', access_token);

            navigate('/dashboard');

        }   catch (err) {
            setError('Login Failed, Please check your email and password again.');
            console.error('Login error:', err.response.data)
        }
    };

    return(
        <div className="h-screen bg-slate-900 flex items-center justify-center">
            <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb6 text-white">Login</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-white">Email</label>
                        <input 
                          type="email" 
                          id="email"
                          className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-white">Password</label>
                        <input 
                          type="password" 
                          id="password"
                          className="w-full px-3 py-2 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                        >
                            Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;