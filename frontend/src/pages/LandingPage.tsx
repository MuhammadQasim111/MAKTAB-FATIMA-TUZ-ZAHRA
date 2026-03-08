import { useEffect } from 'react';
import { motion } from 'framer-motion';

const LandingPage = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        
        return () => observer.disconnect();
    }, []);

    return (
        <main>
            {/* HERO */}
            <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden bg-deep">
                <div className="flex flex-col justify-center px-16 py-32 md:py-20 relative z-[2]">
                    <motion.p 
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-mono text-[0.75rem] tracking-[0.2em] uppercase text-gold mb-6"
                    >
                        01 — Online Platform
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-playfair text-[clamp(2.5rem,4.5vw,5rem)] leading-[1.05] font-bold mb-3"
                    >
                        <span className="block italic text-gold text-[0.65em] mb-1" dir="rtl">نور — روشنایی برای دختران</span>
                        Light for Every Afghan Girl
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-[1.15rem] leading-[1.7] text-warm/95 max-w-md my-8 font-light"
                    >
                        An online AI platform in Dari & Farsi, bringing personalized education to girls who have been denied it — accessible anywhere, secure, and without borders.
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex gap-4 flex-wrap"
                    >
                        <a href="#invest" className="bg-gold text-deep px-9 py-4 text-[0.9rem] font-medium tracking-widest uppercase relative overflow-hidden group">
                           <span className="relative z-10">Invest in Education</span>
                           <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity duration-200" />
                        </a>
                        <a href="#how" className="border border-gold/40 text-gold px-9 py-4 text-[0.9rem] tracking-widest uppercase hover:border-gold hover:bg-gold/10 transition-all duration-200">
                            See How It Works
                        </a>
                    </motion.div>
                </div>

                <div className="hidden md:block relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,168,76,0.15)_0%,transparent_70%)] z-[1]" />
                    <div className="absolute inset-0 flex items-center justify-center z-[2]">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, delay: 0.5 }}
                            className="w-[420px] h-[420px] relative"
                        >
                            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <circle cx="200" cy="200" r="180" fill="url(#bg_radial)" />
                                <circle cx="200" cy="200" r="180" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.3" />
                                <circle cx="200" cy="200" r="140" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.2" />
                                <circle cx="200" cy="200" r="100" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.4" />
                                <polygon points="200,80 215,170 280,120 225,185 320,185 235,210 300,270 210,230 220,320 195,245 165,320 178,228 95,268 165,208 75,185 170,185 115,120 183,170" fill="none" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.5" />
                                <text x="200" y="215" textAnchor="middle" fontFamily="serif" fontSize="56" fill="#C9A84C" opacity="0.9">نور</text>
                                <g className="animate-[rotate_40s_linear_infinite]" style={{ transformOrigin: '200px 200px' }}>
                                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                                        <circle key={angle} cx={200 + 160 * Math.cos(angle * Math.PI / 180)} cy={200 + 160 * Math.sin(angle * Math.PI / 180)} r="3" fill="#C9A84C" opacity="0.6" />
                                    ))}
                                </g>
                                <circle cx="200" cy="200" r="8" fill="#C9A84C" className="animate-[pulse_2s_ease-in-out_infinite]" />
                                <defs>
                                    <radialGradient id="bg_radial" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.12"/>
                                        <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
                                    </radialGradient>
                                </defs>
                            </svg>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="absolute right-12 bottom-12 z-[3] flex flex-col gap-3"
                    >
                        {[
                            { color: '3M+', label: 'Girls denied school since 2021' },
                            { color: '24/7', label: 'Online access to education' },
                            { color: '2', label: 'Languages: Dari & English' }
                        ].map((stat) => (
                            <div key={stat.label} className="bg-deep/85 border border-gold/25 p-4 flex items-center gap-4 backdrop-blur-md">
                                <span className="font-playfair text-3xl text-gold leading-none">{stat.color}</span>
                                <span className="text-[0.75rem] text-warm/90 leading-tight max-w-[120px]">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-12" />

            {/* CRISIS */}
            <section className="px-16 py-24 max-w-[1100px] mx-auto overflow-hidden" id="mission">
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-gold mb-4">02 — The Crisis</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mt-12">
                    <blockquote className="reveal font-playfair text-[clamp(1.5rem,2.5vw,2.2rem)] leading-[1.4] italic text-cream relative pl-6 border-l-[3px] border-gold">
                        "My sister studied medicine for three years. One morning she woke up and it was all gone. Not because she failed — because she was a girl."
                        <cite className="block mt-4 font-ibm text-[0.78rem] text-gold not-italic tracking-[0.1em] uppercase">— Muhammad Qasim, Maktab-Fatma-tuz-zahra, founder</cite>
                    </blockquote>
                    <div className="reveal text-warm/95 space-y-5 leading-[1.8] font-light text-[1rem]">
                        <p>In August 2021, girls were suddenly banned from secondary and higher education. Over 3 million girls lost access to schools overnight — the largest educational exclusion of women in modern history.</p>
                        <p>Traditional solutions often fail to provide culturally relevant or accessible resources. Accessing foreign educational content can sometimes be challenging or unsuited to the local context.</p>
                        <p>Maktab-e-Fatima-tuz-Zuhra was built for this reality: an online platform that is safely accessible from any device, speaking their language, and understanding their world.</p>
                    </div>
                </div>
                <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/15 border border-gold/15 mt-20">
                    {[
                        { big: '3.5M', desc: 'Girls out of school in Afghanistan' },
                        { big: '24/7', desc: 'Secure online availability' },
                        { big: '$0', desc: 'Cost to a girl to learn with us' }
                    ].map((n, i) => (
                        <div key={i} className="bg-deep p-10 text-center">
                            <span className="block font-playfair text-[3rem] text-gold mb-2">{n.big}</span>
                            <span className="text-[0.85rem] text-muted leading-relaxed">{n.desc}</span>
                        </div>
                    ))}
                </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-12" />

            {/* HOW IT WORKS */}
            <section className="px-16 py-24 bg-gradient-to-b from-deep via-[#120E08] to-deep relative overflow-hidden" id="how">
                <div className="absolute right-[-10%] md:right-[-5%] top-1/2 -translate-y-1/2 font-playfair text-[12rem] md:text-[28rem] text-gold opacity-5 select-none pointer-events-none z-0">نور</div>
                <div className="max-w-[1100px] mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-16">
                        <div>
                            <div className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-gold mb-4">03 — The Technology</div>
                            <h2 className="reveal font-playfair text-[clamp(2rem,3.5vw,3rem)] leading-[1.2]">Borderless Education<br/><em className="italic">Online</em></h2>
                        </div>
                        <p className="reveal text-muted text-[0.95rem] leading-[1.8]">Maktab-e-Fatima-tuz-Zuhra runs securely online, accessible from laptops, tablets, or phones. Unrestricted audio learning designed to overcome physical barriers, completely free of charge.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-gold/10">
                        {[
                            { num: '01', title: 'She Listens', p: 'A girl accesses lectures in Dari or English — curated, comprehensive, and tailored to her grade.' },
                            { num: '02', title: 'Cloud Platform', p: 'Our online platform dynamically serves educational material across disciplines like Mathematics and Science.' },
                            { num: '03', title: 'Interactive Learning', p: 'Maktab-Fatima-tuz-zahra provides a digital sanctuary where she can safely absorb knowledge.' },
                            { num: '04', title: 'She Grows', p: 'Lessons build on each other, unlocking new concepts. College and well-being guidance is always just a click away.' }
                        ].map((step, i) => (
                            <div key={i} className="bg-deep p-10 group hover:bg-[#120E08] transition-colors duration-300">
                                <span className="block font-mono text-[0.7rem] text-gold tracking-widest mb-6">{step.num}</span>
                                <h3 className="font-playfair text-xl text-cream mb-3">{step.title}</h3>
                                <p className="text-[0.85rem] text-muted leading-[1.7]">{step.p}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* INVEST */}
             <section className="px-16 py-24 max-w-[1100px] mx-auto" id="invest">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-16">
                    <div>
                        <div className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-gold mb-4">06 — Support Noor</div>
                        <h2 className="reveal font-playfair text-[clamp(2rem,3.5vw,3rem)] leading-[1.2]">Your Investment<br/><em className="italic">Lights a Life</em></h2>
                    </div>
                    <p className="reveal text-muted text-[0.95rem] leading-[1.8]">Your support directly funds server infrastructure, curriculum creation, and outreach. Every dollar goes directly towards expanding our digital footprint so more girls can connect and learn.</p>
                </div>
                <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-gold/15">
                     {[
                         { amount: '$50', name: 'One Light', impact: 'Sponsor server uptime and database expansion required to serve a growing number of students online.', points: ['Continuous curriculum updates', 'Global digital reach', 'Impact report to donor'] },
                         { amount: '$500', name: 'Digital Scholar', impact: 'Provide comprehensive data access or digital grants to students struggling to get online.', points: ['Internet data grants', 'Direct scholarship impact', 'Quarterly updates'], featured: true },
                         { amount: 'Custom', name: 'Institutional', impact: 'Partner with us scale cloud infrastructure, fund new subjects, or join our advisory board.', points: ['Infrastructure scaling', 'New course creation', 'Advisory board seat'] }
                     ].map((tier, i) => (
                         <div key={i} className={`p-10 relative group bg-deep ${tier.featured ? 'bg-gradient-to-br from-[#1A1208] to-deep' : ''}`}>
                             {tier.featured && <div className="absolute top-4 right-4 font-mono text-[0.6rem] tracking-widest text-gold border border-gold/30 px-2 py-1">MOST IMPACT</div>}
                             <div className="font-playfair text-[2.5rem] text-gold mb-2">{tier.amount}</div>
                             <div className="font-mono text-[0.75rem] uppercase tracking-widest text-muted mb-6">{tier.name}</div>
                             <p className="text-[0.9rem] text-warm leading-[1.7] mb-8">{tier.impact}</p>
                             <ul className="mb-8 space-y-2">
                                 {tier.points.map((p, j) => (
                                     <li key={j} className="text-[0.82rem] text-muted flex items-start gap-2 border-b border-gold/10 pb-2">
                                         <span className="text-gold">→</span> {p}
                                     </li>
                                 ))}
                             </ul>
                             <a href="/donate" className={`block w-full text-center py-4 text-[0.8rem] transition-all duration-300 font-medium tracking-widest ${tier.featured ? 'bg-gold text-deep hover:bg-cream' : 'border border-gold text-gold hover:bg-gold/10'}`}>
                                 {tier.amount === 'Custom' ? 'Talk to Us' : `Fund ${tier.name}`}
                             </a>
                         </div>
                     ))}
                </div>
            </section>
        </main>
    );
};

export default LandingPage;
