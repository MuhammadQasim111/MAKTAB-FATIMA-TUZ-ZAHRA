import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trash2, Upload, LogOut, ChevronRight, CheckCircle, List } from 'lucide-react';

const AdminDashboard = () => {
    const [lessons, setLessons] = useState<any[]>([]);
    const [donations, setDonations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [tab, setTab] = useState<'lessons' | 'donations' | 'upload'>('lessons');
    
    // Form state
    const [formData, setFormData] = useState({
        title_en: '',
        title_dari: '',
        subject: 'Maths',
        grade_level: '',
        lesson_number: '',
        language: 'dari'
    });
    const [audioFile, setAudioFile] = useState<File | null>(null);

    const navigate = useNavigate();
    const token = localStorage.getItem('admin_token');

    useEffect(() => {
        if (!token) navigate('/admin/login');
        fetchData();
    }, [token, navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const [lessonsRes, donationsRes] = await Promise.all([
                axios.get('/api/lessons'),
                axios.get('/api/donations', config)
            ]);
            setLessons(lessonsRes.data);
            setDonations(donationsRes.data);
        } catch (err) {
            console.error('Fetch error:', err);
            // navigate('/admin/login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    const handleDeleteLesson = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this lesson?')) return;
        try {
            await axios.delete(`/api/lessons/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (err) {
            alert('Delete failed');
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!audioFile) return alert('Please select an audio file');
        
        setUploading(true);
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        data.append('audio', audioFile);

        try {
            await axios.post('/api/lessons', data, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setTab('lessons');
            fetchData();
            setFormData({ title_en: '', title_dari: '', subject: 'Maths', grade_level: '', lesson_number: '', language: 'dari' });
            setAudioFile(null);
            alert('Lesson uploaded successfully');
        } catch (err) {
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-deep flex items-center justify-center text-gold font-mono">Loading sanctuary records...</div>;

    return (
        <div className="min-h-screen bg-deep text-cream py-32 px-12">
            <header className="flex justify-between items-center mb-16 border-b border-gold/20 pb-8">
                <div>
                    <h1 className="font-playfair text-4xl text-gold mb-2">Noor Sanctuary Vault</h1>
                    <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">Amanat-e-Fatima-tuz-Zahra Management System</p>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 font-mono text-xs text-rust bg-rust/10 border border-rust/30 px-4 py-2 hover:bg-rust hover:text-white transition-all">
                    <LogOut size={14} /> Exit Sanctuary
                </button>
            </header>

            <div className="flex gap-12">
                <aside className="w-64 space-y-2">
                    {[
                        { id: 'lessons', label: 'Curriculum Vault', icon: List },
                        { id: 'upload', label: 'Gift a Lecture', icon: Upload },
                        { id: 'donations', label: 'Generous Hearts', icon: CheckCircle },
                    ].map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => setTab(item.id as any)}
                            className={`w-full flex items-center gap-3 font-playfair text-lg text-left px-6 py-4 border transition-all ${tab === item.id ? 'bg-gold/10 border-gold/50 text-gold shadow-[0_0_20px_rgba(201,168,76,0.1)]' : 'border-transparent text-muted hover:border-gold/20 hover:text-warm'}`}
                        >
                            <item.icon size={18} /> {item.label}
                        </button>
                    ))}
                </aside>

                <main className="flex-1 bg-deep/50 border border-gold/15 p-10 min-h-[600px] relative">
                    {tab === 'lessons' && (
                        <div className="space-y-8 animate-fadeIn">
                            <h2 className="font-playfair text-3xl mb-10 border-b border-gold/10 pb-4">Stored Lectures</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted border-b border-gold/10">
                                        <tr>
                                            <th className="pb-6 px-4">Ref</th>
                                            <th className="pb-6 px-4">Title (EN/DARI)</th>
                                            <th className="pb-6 px-4">Subject</th>
                                            <th className="pb-6 px-4">Language</th>
                                            <th className="pb-6 px-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gold/5">
                                        {lessons.map((l) => (
                                            <tr key={l.id} className="group hover:bg-gold/5 transition-colors">
                                                <td className="py-6 px-4 font-mono text-[0.7rem] text-gold">{l.lesson_number}</td>
                                                <td className="py-6 px-4">
                                                    <div className="text-warm font-medium">{l.title_en}</div>
                                                    <div className="text-muted text-sm italic" dir="rtl">{l.title_dari}</div>
                                                </td>
                                                <td className="py-6 px-4">
                                                    <span className="bg-gold/10 text-gold text-[0.7rem] px-3 py-1 uppercase tracking-widest">{l.subject}</span>
                                                </td>
                                                <td className="py-6 px-4 font-mono text-[0.75rem] text-muted uppercase tracking-widest">{l.language}</td>
                                                <td className="py-6 px-4">
                                                    <button onClick={() => handleDeleteLesson(l.id)} className="text-rust hover:text-red-400 transition-colors">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {tab === 'upload' && (
                        <div className="max-w-xl mx-auto py-10 animate-fadeIn">
                            <h2 className="font-playfair text-3xl mb-10 border-b border-gold/10 pb-4 text-center">Seal a New Gift of Knowledge</h2>
                            <form onSubmit={handleUpload} className="space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="font-mono text-[0.65rem] uppercase tracking-widest text-gold opacity-80">English Title</label>
                                        <input required value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} className="w-full bg-deep border border-gold/20 p-4 text-sm focus:border-gold outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-mono text-[0.65rem] uppercase tracking-widest text-gold opacity-80 text-right block">Dari Title</label>
                                        <input dir="rtl" required value={formData.title_dari} onChange={e => setFormData({...formData, title_dari: e.target.value})} className="w-full bg-deep border border-gold/20 p-4 text-sm text-right focus:border-gold outline-none font-playfair" />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="font-mono text-[0.65rem] uppercase tracking-widest text-gold opacity-80">Subject Sphere</label>
                                        <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-deep border border-gold/20 p-4 text-sm focus:border-gold outline-none appearance-none">
                                            {['Maths', 'Dari', 'English', 'Science', 'University Guidance', 'Wellbeing'].map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-mono text-[0.65rem] uppercase tracking-widest text-gold opacity-80">Lesson Rank</label>
                                        <input type="number" required value={formData.lesson_number} onChange={e => setFormData({...formData, lesson_number: e.target.value})} className="w-full bg-deep border border-gold/20 p-4 text-sm focus:border-gold outline-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="font-mono text-[0.65rem] uppercase tracking-widest text-gold opacity-80">Audio Vessel (.mp3)</label>
                                    <label className="border-2 border-dashed border-gold/20 p-12 flex flex-col items-center gap-4 cursor-pointer hover:border-gold/40 hover:bg-gold/5 transition-all">
                                        <Upload size={32} className="text-gold opacity-50" />
                                        <span className="text-muted text-sm">{audioFile ? audioFile.name : 'Chose an audio file to immortalize'}</span>
                                        <input type="file" accept="audio/*" onChange={e => setAudioFile(e.target.files?.[0] || null)} className="hidden" />
                                    </label>
                                </div>

                                <button disabled={uploading} className="w-full bg-gold text-deep py-6 font-medium tracking-widest uppercase hover:bg-cream transition-all shadow-[0_4px_30px_rgba(201,168,76,0.15)] flex justify-center items-center gap-3">
                                    {uploading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-deep border-t-transparent animate-spin rounded-full" />
                                            Encrypting & Saving Knowledge...
                                        </>
                                    ) : (
                                        <>
                                            <ChevronRight size={18} />
                                            Submit to Sanctuary
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    {tab === 'donations' && (
                         <div className="space-y-8 animate-fadeIn">
                             <h2 className="font-playfair text-3xl mb-10 border-b border-gold/10 pb-4">Wall of Recognition</h2>
                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                 {donations.map((d) => (
                                     <div key={d.id} className="bg-gold/5 border border-gold/10 p-8 hover:border-gold/30 transition-all group">
                                         <div className="flex justify-between items-start mb-4">
                                             <div>
                                                 <h4 className="font-playfair text-xl text-warm mb-1">{d.donor_name || 'Anonymous Giver'}</h4>
                                                 <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">{d.donor_email || 'Privacy Shield Protected'}</p>
                                             </div>
                                             <div className="text-2xl font-playfair text-gold">${d.amount_usd}</div>
                                         </div>
                                         <p className="text-[0.85rem] text-muted leading-relaxed italic border-t border-gold/5 pt-4">"{d.message || 'The greatest gift is that which is given in silence.'}"</p>
                                         <div className="mt-4 text-[0.6rem] font-mono text-muted/40 uppercase tracking-widest">{new Date(d.created_at).toLocaleDateString()}</div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
