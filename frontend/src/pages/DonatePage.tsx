import { useState } from 'react';
import axios from 'axios';
import { Heart, Landmark, CheckCircle, ChevronRight, Share2 } from 'lucide-react';

const tiers = [
    { amount: 5, name: 'Sustenance', impact: 'Provide essential infrastructure support for the platform.', points: ['Server upkeep', 'Database scaling', 'Security maintenance'] },
    { amount: 50, name: 'A New Light', impact: 'Sponsor continuous curriculum updates and expanded digital reach.', points: ['Content creation', 'Audio recording', 'Global availability', 'Progress reports'] },
    { amount: 500, name: 'A Circle of Hope', impact: 'Provide crucial digital scholarships (devices or internet data) for girls in need.', points: ['Data packages', 'Internet access grants', 'Monthly impact reports', 'Named recognition'] }
];

const DonatePage = () => {
    const [selectedAmount, setSelectedAmount] = useState<number | 'custom' | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const amount = selectedAmount === 'custom' ? parseInt(customAmount) : selectedAmount;

        try {
            await axios.post('/api/donations', {
                donor_name: name,
                donor_email: email,
                amount_usd: amount,
                message: message
            });
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-deep text-cream py-48 px-12 flex items-center justify-center animate-fadeIn relative overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gold/10 blur-[150px] rounded-full pointer-events-none z-0" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-rust/10 blur-[150px] rounded-full pointer-events-none z-0" />
                
                <div className="max-w-2xl w-full backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] rounded-3xl p-16 text-center relative overflow-hidden z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.05),transparent_70%)]" />
                    <CheckCircle size={80} className="text-gold mx-auto mb-8 animate-bounce drop-shadow-[0_0_15px_rgba(201,168,76,0.4)]" />
                    <h1 className="font-playfair text-5xl text-gold mb-6 italic leading-tight">Shukran — Your Light is Received</h1>
                    <p className="text-cream/90 text-lg mb-12 leading-relaxed font-light">Your pledge has been securely recorded. Due to international banking sanctions, the final transfer must be completed manually via our digital sanctuary repository. Please finalize sending the funds using the exact details below.</p>

                    <div className="bg-black/20 backdrop-blur-md border border-white/[0.05] rounded-2xl p-10 text-left mb-12 group hover:border-gold/30 transition-all duration-500 shadow-inner">
                        <div className="font-mono text-[0.75rem] uppercase tracking-widest text-gold mb-6 opacity-80 drop-shadow-sm">Sacred Repository Details</div>
                        <div className="space-y-5">
                            <div className="flex flex-col gap-2 border-b border-white/[0.05] pb-4">
                                <span className="text-[0.65rem] font-mono text-muted uppercase tracking-tighter">Beneficiary Name</span>
                                <span className="text-xl font-playfair text-cream drop-shadow-md">MUHAMMAD QASIM SHER KHAN SHAIRWANI</span>
                            </div>
                            <div className="flex flex-col gap-2 border-b border-white/[0.05] pb-4">
                                <span className="text-[0.65rem] font-mono text-muted uppercase tracking-tighter">Account Number</span>
                                <span className="text-xl font-ibm text-gold tracking-widest drop-shadow-md">00300112754279</span>
                            </div>
                            <div className="flex flex-col gap-2 border-b border-white/[0.05] pb-4">
                                <span className="text-[0.65rem] font-mono text-muted uppercase tracking-tighter">IBAN / Swift</span>
                                <span className="text-xl font-ibm text-gold tracking-widest drop-shadow-md">PK64MEZN0000300112754279</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[0.65rem] font-mono text-muted uppercase tracking-tighter">Sanctuary Institution</span>
                                <span className="text-xl font-playfair text-cream drop-shadow-md">MEEZAN DIGITAL CENTRE</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <button onClick={() => setIsSubmitted(false)} className="flex-1 rounded-xl bg-gold/90 text-deep py-5 font-medium tracking-widest uppercase hover:bg-gold transition-all flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(201,168,76,0.3)] hover:-translate-y-1">
                            <Share2 size={18} /> Share our Mission
                        </button>
                        <a href="/" className="flex-1 rounded-xl backdrop-blur-md bg-white/[0.02] border border-white/10 text-gold py-5 font-medium tracking-widest uppercase hover:bg-white/[0.05] transition-all flex items-center justify-center gap-3 hover:-translate-y-1">
                            ← Return to Path
                        </a>
                    </div>

                    <p className="mt-12 text-xs font-mono text-muted/40 uppercase tracking-widest z-10 relative">A receipt has been dispatched to your sanctuary email.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-deep text-cream py-32 px-12 md:px-24 relative overflow-hidden">
            <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[150px] rounded-full pointer-events-none z-0" />
            <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />
            
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start relative z-10">
                <div>
                    <div className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-gold mb-6">Support Sanctuary</div>
                    <h1 className="font-playfair text-5xl md:text-7xl text-gold mb-10 leading-[1.05] font-bold">Invest in the <br /><em className="italic">Future of Noor</em></h1>
                    <p className="text-muted text-lg mb-12 leading-relaxed font-light">Your generosity directly scales the wall of ignorance. Every dollar is transformed into robust cloud infrastructure, comprehensive online lectures, and digital access scholarships.</p>

                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-6 group">
                            <div className="w-12 h-12 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-gold group-hover:bg-white/[0.08] transition-colors duration-500 shadow-lg">
                                <Heart size={20} />
                            </div>
                            <p className="text-[0.95rem] text-cream/90 font-light leading-relaxed drop-shadow-sm">100% of your gift goes directly to technical infrastructure & content dissemination.</p>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="w-12 h-12 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-gold group-hover:bg-white/[0.08] transition-colors duration-500 shadow-lg">
                                <Landmark size={20} />
                            </div>
                            <p className="text-[0.95rem] text-cream/90 font-light leading-relaxed drop-shadow-sm">Direct bank transfer for maximum transparency and security.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {tiers.map((t) => (
                            <button
                                key={t.amount}
                                onClick={() => setSelectedAmount(t.amount)}
                                className={`text-left p-8 rounded-2xl border backdrop-blur-xl transition-all duration-500 relative group overflow-hidden ${selectedAmount === t.amount ? 'bg-gold/10 border-gold/50 shadow-[0_8px_32px_rgba(201,168,76,0.15)]' : 'bg-white/[0.02] border-white/[0.05] hover:border-gold/30 hover:bg-white/[0.04]'}`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div>
                                        <h3 className="font-playfair text-2xl text-gold mb-1 font-bold group-hover:text-cream transition-colors drop-shadow-md">${t.amount}</h3>
                                        <div className="font-mono text-[0.65rem] uppercase tracking-widest text-cream/70">{t.name} Investment</div>
                                    </div>
                                    {selectedAmount === t.amount && <CheckCircle size={24} className="text-gold drop-shadow-md" />}
                                </div>
                                <p className="text-[0.9rem] text-cream/80 border-t border-white/[0.05] pt-4 leading-relaxed font-light relative z-10">{t.impact}</p>
                            </button>
                        ))}
                        <button
                            onClick={() => setSelectedAmount('custom')}
                            className={`text-left p-8 rounded-2xl border backdrop-blur-xl transition-all duration-500 ${selectedAmount === 'custom' ? 'bg-gold/10 border-gold/50 shadow-[0_8px_32px_rgba(201,168,76,0.15)]' : 'bg-white/[0.02] border-white/[0.05] hover:border-gold/30 hover:bg-white/[0.04]'}`}
                        >
                            <h3 className="font-playfair text-2xl text-gold group-hover:text-cream transition-colors drop-shadow-md">Custom Offering</h3>
                            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-cream/70 mt-1">Specify your gift in the scroll</p>
                        </button>
                    </div>
                </div>

                <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-3xl p-10 md:p-14 relative sticky top-32 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 select-none pointer-events-none" />
                    <h2 className="font-playfair text-3xl text-cream mb-6 pb-6 border-b border-white/[0.08] italic text-center drop-shadow-md">Sanctuary Pledge Form</h2>
                    
                    <div className="bg-rust/20 backdrop-blur-md border border-rust/30 rounded-xl p-5 mb-8 shadow-inner">
                        <p className="text-rust/90 text-[0.85rem] leading-relaxed text-center font-mono uppercase tracking-wide">
                            Note: Due to international banking restrictions, we cannot process credit cards automatically. Please register your pledge below to receive secure manual bank transfer instructions.
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {selectedAmount === 'custom' && (
                            <div className="space-y-2 animate-fadeIn">
                                <label className="font-mono text-[0.65rem] uppercase tracking-widest text-gold opacity-90 ml-1">Custom Amount (USD)</label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-cream/50">$</span>
                                    <input
                                        type="number"
                                        required
                                        value={customAmount}
                                        onChange={(e) => setCustomAmount(e.target.value)}
                                        className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-5 pl-12 text-xl font-bold text-cream focus:border-gold/50 focus:bg-white/5 outline-none transition-all shadow-inner"
                                        placeholder="Enter your gift"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="font-mono text-[0.65rem] uppercase tracking-widest text-gold opacity-90 ml-1">Giver's Name</label>
                            <input
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-cream focus:border-gold/50 focus:bg-white/5 outline-none transition-all shadow-inner"
                                placeholder="Your Name or Anonymous"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-mono text-[0.65rem] uppercase tracking-widest text-gold opacity-90 ml-1">Sanctuary Dispatch (Email)</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-cream focus:border-gold/50 focus:bg-white/5 outline-none transition-all shadow-inner"
                                placeholder="mqasim111786111@gmail.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-mono text-[0.65rem] uppercase tracking-widest text-gold opacity-90 ml-1">Message for the Sanctuary (Optional)</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={3}
                                className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-cream focus:border-gold/50 focus:bg-white/5 outline-none transition-all resize-none shadow-inner"
                                placeholder="A prayer or note for the sanctuary..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || selectedAmount === null}
                            className="w-full bg-gold/90 text-deep py-6 mt-4 rounded-2xl font-bold tracking-widest uppercase hover:bg-gold transition-all duration-300 group disabled:opacity-40 disabled:grayscale flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(201,168,76,0.3)] hover:shadow-[0_8px_40px_rgba(201,168,76,0.5)] hover:-translate-y-1"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-deep border-t-transparent animate-spin rounded-full" />
                                    Submitting Offering...
                                </>
                            ) : (
                                <>
                                    Register Pledge & Get Bank Details
                                    <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DonatePage;
