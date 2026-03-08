import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);
            
            const response = await axios.post('/api/auth/login', formData);
            localStorage.setItem('admin_token', response.data.access_token);
            navigate('/admin');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-32 bg-deep relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1),transparent_70%)]" />
            
            <div className="max-w-md w-full bg-deep/90 border border-gold/20 p-10 relative z-10 backdrop-blur-md">
                <div className="text-center mb-10">
                    <h2 className="font-playfair text-3xl text-gold mb-2">Admin Portal</h2>
                    <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">Amanat-e-Fatima-tuz-Zahra</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="p-4 bg-rust/20 border border-rust/50 text-rust text-sm">{error}</div>}
                    
                    <div className="space-y-2">
                        <label className="font-mono text-[0.65rem] uppercase tracking-widest text-gold block">Email Address</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-deep border border-gold/15 p-4 text-cream focus:border-gold outline-none transition-colors"
                            placeholder="mqasim111786111@gmail.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="font-mono text-[0.65rem] uppercase tracking-widest text-gold block">Password</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-deep border border-gold/15 p-4 text-cream focus:border-gold outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gold text-deep py-4 font-medium tracking-widest uppercase hover:bg-cream transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Enter Sanctuary'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
