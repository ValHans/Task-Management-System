import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('') ;
    const [email, setEmail] = useState('') ;
    const [password, setPassword] = useState('') ;
    const [error, setError] = useState('') ;
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventdefault();
        setError('');

        try{
            await axios.post('http://localhost3000/auth/register', {
                name,
                email,
                password,
            });

            navigate('/login')
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error('Registration error:', err.response.data)
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
            <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2">Name</label>
                        <input type="text" id="name" className="w-full px-3 py-2 bg-slate-700 rounded-md" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input type="text" id="email" className="w-full px-3 py-2 bg-slate-700 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2"></label>
                        <input type="text" id="password" className="w-full px-3 py-2 bg-slate-700 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;