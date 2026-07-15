import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Logo from '../../assets/images/logo.png';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' },
  ];

  const responsibilityLinks = [
    { path: '/operations', label: 'Operations' },
    { path: '/sustainability', label: 'Sustainability' },
    { path: '/impact', label: 'Impact' },
  ];

  // const allNavLinks = [...navLinks];

  const isResponsibilityActive = responsibilityLinks.some(
    (link) => location.pathname === link.path
  );


  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#1a1a1a]/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* <img src={Logo} alt="PK5 Mining Logo" loading="lazy" className="w-40 h-auto object-contain" /> */}
          <img
            src={Logo}
            alt="PK5 Mining Logo"
            loading="lazy"
            className="w-40 h-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="relative group">
              <motion.span
                className={`text-sm font-medium transition-colors ${location.pathname === link.path
                  ? 'text-[#D4AF37]'
                  : 'text-[#a0a0a0] group-hover:text-white'
                  }`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.span>
              {location.pathname === link.path && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}

          {/* Our Responsibility Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="relative group flex items-center gap-1.5">
              <motion.span
                className={`text-sm font-medium transition-colors ${isResponsibilityActive
                  ? 'text-[#D4AF37]'
                  : 'text-[#a0a0a0] group-hover:text-white'
                  }`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Responsibilities
              </motion.span>
              <motion.div
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown
                  size={16}
                  className={`transition-colors ${isResponsibilityActive
                    ? 'text-[#D4AF37]'
                    : 'text-[#a0a0a0] group-hover:text-white'
                    }`}
                />
              </motion.div>
              {isResponsibilityActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64"
                >
                  <div
                    className="rounded-xl overflow-hidden shadow-2xl border border-[#D4AF37]/20"
                    style={{
                      background: 'rgba(10, 10, 10, 0.98)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Gold accent line at top */}
                    <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                    {/* Dropdown items */}
                    <div className="py-2">
                      {responsibilityLinks.map((link, index) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="block"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`px-5 py-3.5 transition-all duration-200 ${location.pathname === link.path
                              ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-l-2 border-[#D4AF37]'
                              : 'text-[#a0a0a0] hover:bg-[#1a1a1a] hover:text-white border-l-2 border-transparent'
                              }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{link.label}</span>
                              {location.pathname === link.path && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                                />
                              )}
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>

                    {/* Bottom subtle glow */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: mobileMenuOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden bg-[#1a1a1a]/98"
      >
        <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 ${location.pathname === link.path ? 'text-[#c89b3c]' : 'text-gray-300'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Dropdown */}
        <div>
          <button
            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            className={`w-full py-3 px-4 rounded-lg transition-all flex items-center justify-between ${isResponsibilityActive
              ? 'text-[#D4AF37] bg-[#D4AF37]/10 font-medium'
              : 'text-[#a0a0a0] hover:text-white hover:bg-[#1a1a1a]'
              }`}
          >
            <span>Our Responsibility</span>
            <motion.div
              animate={{ rotate: mobileDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </button>

          <AnimatePresence>
            {mobileDropdownOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="ml-4 mt-1 border-l-2 border-[#D4AF37]/20">
                  {responsibilityLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileDropdownOpen(false);
                      }}
                      className={`block py-2.5 pl-4 pr-4 rounded-r-lg transition-all ${location.pathname === link.path
                        ? 'text-[#D4AF37] bg-[#D4AF37]/10 font-medium border-l-2 border-[#D4AF37] -ml-[2px]'
                        : 'text-[#a0a0a0] hover:text-white hover:bg-[#1a1a1a]/50'
                        }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

    </motion.header>
  );
}
