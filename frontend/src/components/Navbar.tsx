import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-12 py-5 flex justify-between items-center bg-gradient-to-b from-deep/95 to-transparent">
      <Link to="/" className="text-2xl font-playfair tracking-wider text-gold">
        Noor <span className="italic text-cream">نور</span>
      </Link>
      <div className="flex items-center space-x-8">
        <Link to="/#mission" className="uppercase text-[0.85rem] tracking-[0.1em] text-warm/80 hover:text-gold transition-colors">Mission</Link>
        <Link to="/#how" className="uppercase text-[0.85rem] tracking-[0.1em] text-warm/80 hover:text-gold transition-colors">How It Works</Link>
        <Link to="/lessons" className="uppercase text-[0.85rem] tracking-[0.1em] text-warm/80 hover:text-gold transition-colors font-medium">Lessons</Link>
        <Link to="/donate" className="bg-gold text-deep px-6 py-2 uppercase text-[0.85rem] font-medium tracking-widest hover:bg-cream transition-colors">Support Now</Link>
        <Link to="/admin" className="uppercase text-[0.85rem] tracking-[0.1em] text-warm/80 hover:text-gold transition-colors">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
