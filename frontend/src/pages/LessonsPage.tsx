import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Play, Pause, SkipBack, SkipForward, Music, Filter, ChevronRight, Volume2 } from 'lucide-react';

const subjects = [
    { id: 'maths', name_en: 'Mathematics', name_dari: 'ریاضیات', emoji: '🔢', count: 120, desc: 'From basic numeracy to algebra, geometry, and pre-calculus.' },
    { id: 'dari', name_en: 'Dari Literacy', name_dari: 'سواد دری', emoji: '📖', count: 90, desc: 'Reading, writing, comprehension, and creative expression in Dari.' },
    { id: 'english', name_en: 'English Language', name_dari: 'زبان انگلیسی', emoji: '🌍', count: 150, desc: 'Conversational English for university applications and international opportunity.' },
    { id: 'science', name_en: 'Science', name_dari: 'علوم طبیعی', emoji: '🧪', count: 100, desc: 'Biology, chemistry, and physics taught through storytelling.' },
    { id: 'university guidance', name_en: 'University Guidance', name_dari: 'راهنمای دانشگاه', emoji: '🎓', count: 60, desc: 'Step-by-step guidance for international scholarships.' },
    { id: 'wellbeing', name_en: 'Wellbeing & Rights', name_dari: 'حقوق و سلامت', emoji: '💙', count: 40, desc: 'Human rights, mental health, and safe communication.' }
];

const LessonsPage = () => {
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [lessons, setLessons] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentLesson, setCurrentLesson] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (selectedSubject) {
            fetchLessons(selectedSubject);
        }
    }, [selectedSubject]);

    const fetchLessons = async (subject: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/lessons?subject=${subject}`);
            setLessons(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePlayLesson = (lesson: any) => {
        if (currentLesson?.id === lesson.id) {
            if (isPlaying) {
                audioRef.current?.pause();
                setIsPlaying(false);
            } else {
                audioRef.current?.play();
                setIsPlaying(true);
            }
        } else {
            setCurrentLesson(lesson);
            setIsPlaying(true);
            if (audioRef.current) {
                audioRef.current.src = lesson.audio_url;
                audioRef.current.play();
            }
        }
    };

    return (
        <div className="min-h-screen bg-deep text-cream py-32 px-12 md:px-24">
            <header className="mb-16 text-center max-w-2xl mx-auto">
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-gold mb-4">Educational Vault</div>
                <h1 className="font-playfair text-4xl md:text-5xl text-gold mb-6 leading-tight">Sacred Wisdom &<br/><em className="italic">Infinite Learning</em></h1>
                <p className="text-muted text-[0.95rem] leading-[1.8]">Select a sphere of knowledge to begin your journey. Audio-first, culturally sensitive, and safe for exploration.</p>
            </header>

            {!selectedSubject ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
                    {subjects.map((s) => (
                        <button 
                            key={s.id}
                            onClick={() => setSelectedSubject(s.name_en)}
                            className="text-left group relative border border-gold/15 p-10 hover:border-gold/40 transition-all duration-500 overflow-hidden bg-deep hover:shadow-[0_0_50px_rgba(201,168,76,0.05)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="text-[2.5rem] mb-6 block transform group-hover:scale-110 transition-transform duration-500">{s.emoji}</span>
                            <h3 className="font-playfair text-2xl mb-2 text-gold group-hover:text-cream transition-colors duration-500">{s.name_en}</h3>
                            <div className="text-lg text-gold mb-4 arabic italic" dir="rtl">{s.name_dari}</div>
                            <p className="text-sm text-muted mb-6 leading-relaxed max-w-[280px]">{s.desc}</p>
                            <div className="font-mono text-[0.65rem] tracking-[0.2em] text-gold uppercase opacity-60 flex items-center gap-2">
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                {s.count} Audio Lectures
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="space-y-12 animate-fadeIn">
                    <button 
                        onClick={() => setSelectedSubject(null)}
                        className="font-mono text-[0.7rem] text-muted flex items-center gap-2 hover:text-gold transition-colors"
                    >
                        ← Return to Sphere Selection
                    </button>
                    
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gold/10 pb-10">
                        <div>
                            <h2 className="font-playfair text-4xl text-gold mb-2">{selectedSubject}</h2>
                            <p className="font-mono text-xs uppercase tracking-widest text-muted">{lessons.length} Path(s) of Knowledge Available</p>
                        </div>
                        <div className="flex items-center gap-4 bg-gold/5 border border-gold/10 px-6 py-4 rounded-full">
                            <Filter size={14} className="text-gold" />
                            <span className="font-mono text-xs uppercase tracking-widest text-gold">Grade {lessons[0]?.grade_level || 'All'}</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="h-64 flex items-center justify-center text-gold font-mono text-sm tracking-[0.4em] animate-pulse">Summoning Wisdom...</div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {lessons.map((lesson) => (
                                <div 
                                    key={lesson.id} 
                                    className={`group border p-8 flex items-center justify-between transition-all duration-300 ${currentLesson?.id === lesson.id ? 'bg-gold/10 border-gold/40' : 'bg-deep border-gold/10 hover:border-gold/30'}`}
                                >
                                    <div className="flex items-center gap-8">
                                        <div className="font-mono text-[0.7rem] text-gold opacity-40 bg-gold/5 w-10 h-10 flex items-center justify-center border border-gold/10 uppercase tracking-tighter">
                                            {lesson.lesson_number}
                                        </div>
                                        <div>
                                            <h4 className="font-playfair text-xl text-warm mb-1">{lesson.title_en}</h4>
                                            <p className="arabic text-sm text-muted italic" dir="rtl">{lesson.title_dari}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handlePlayLesson(lesson)}
                                        className={`w-14 h-14 flex items-center justify-center transition-all duration-300 ${currentLesson?.id === lesson.id && isPlaying ? 'bg-gold text-deep' : 'bg-gold/10 text-gold hover:bg-gold/20'}`}
                                    >
                                        {currentLesson?.id === lesson.id && isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* FLOATING AUDIO PLAYER */}
            {currentLesson && (
                <div className="fixed bottom-0 left-0 right-0 z-[100] bg-deep/95 border-t border-gold/20 backdrop-blur-xl px-12 py-6 animate-[slideUp_0.5s_ease-out]">
                    <audio 
                        ref={audioRef} 
                        onPlay={() => setIsPlaying(true)} 
                        onPause={() => setIsPlaying(false)} 
                        src={currentLesson.audio_url}
                        className="hidden"
                    />
                    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 flex items-center gap-6">
                            <div className="w-16 h-16 bg-gold/10 border border-gold/20 flex items-center justify-center text-gold relative overflow-hidden group">
                                <Music size={24} className={`${isPlaying ? 'animate-bounce' : ''}`} />
                                {isPlaying && <div className="absolute inset-0 bg-gold/5 animate-pulse" />}
                            </div>
                            <div className="min-w-0">
                                <h5 className="font-playfair text-xl text-gold truncate">Lecture {currentLesson.lesson_number}: {currentLesson.title_en}</h5>
                                <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted">{currentLesson.subject} Sphere</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-12">
                             <div className="flex items-center gap-6">
                                <button className="text-gold/50 hover:text-gold transition-colors"><SkipBack size={20} /></button>
                                <button 
                                    onClick={() => handlePlayLesson(currentLesson)}
                                    className="w-12 h-12 bg-gold text-deep flex items-center justify-center hover:bg-cream transition-colors"
                                >
                                    {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                                </button>
                                <button className="text-gold/50 hover:text-gold transition-colors"><SkipForward size={20} /></button>
                             </div>
                             
                             <div className="hidden lg:flex items-center gap-4 group">
                                <Volume2 size={18} className="text-gold/50 group-hover:text-gold" />
                                <div className="w-32 h-1 bg-gold/10 relative overflow-hidden">
                                    <div className="absolute inset-y-0 left-0 bg-gold w-3/4" />
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            )}
            
            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default LessonsPage;
