const Footer = () => {
  return (
    <>
      <footer className="border-t border-gold/10 p-16 grid grid-cols-1 md:grid-cols-3 gap-12 bg-deep">
        <div className="space-y-4">
          <span className="text-3xl font-playfair tracking-wider text-gold">Maktab-Fatima-tuz-zahra <span className="italic text-cream">نور</span></span>
          <p className="text-sm text-muted max-w-xs leading-relaxed">
            Online AI education for Afghan girls. Built with love by a team who has seen what's at stake.
          </p>
        </div>
        <div>
          <h4 className="font-mono text-[0.75rem] uppercase tracking-widest text-gold mb-5">Navigate</h4>
          <ul className="space-y-3">
            <li><a href="#mission" className="text-muted text-sm hover:text-cream transition-colors">Our Mission</a></li>
            <li><a href="#how" className="text-muted text-sm hover:text-cream transition-colors">How It Works</a></li>
            <li><a href="#curriculum" className="text-muted text-sm hover:text-cream transition-colors">Curriculum</a></li>
            <li><a href="#invest" className="text-muted text-sm hover:text-cream transition-colors">Support Noor</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-[0.75rem] uppercase tracking-widest text-gold mb-5">Contact</h4>
          <ul className="space-y-3">
            <li><a href="mailto:mqasim111786111@gmail.com" className="text-muted text-sm hover:text-cream transition-colors">mqasim111786111@gmail.com</a></li>
          </ul>
        </div>
      </footer>
      <div className="border-t border-gold/5 px-16 py-6 flex flex-col md:row gap-4 justify-between items-center text-[0.75rem] text-muted/60 bg-deep">
        <p>© 2025 Maktab-Fatima-tuz-Zahra Education. All rights reserved.</p>
        <p className="arabic" dir="rtl"> روشنایی برای هر افغان</p>
      </div>
    </>
  );
};

export default Footer;
