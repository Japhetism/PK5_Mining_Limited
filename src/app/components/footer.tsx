import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { email, locations, minerals, telephone } from '../fixtures';
import { IMineral } from '../interfaces';
import Logo from '../../assets/images/logo.png';

const footerLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Sustainability', path: '/sustainability' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#0f0f0f] border-t border-gray-800"
    >
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={Logo} alt="PK5 Mining Logo" className="w-30 h-auto object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Powering industry through responsible mining of strategic minerals and natural resources.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: '#c89b3c' }}
                className="text-gray-400 transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: '#c89b3c' }}
                className="text-gray-400 transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: '#c89b3c' }}
                className="text-gray-400 transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#c89b3c] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Minerals */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Our Minerals</h3>
            <ul className="space-y-3">
              {minerals.map((mineral: IMineral) => (
                <li key={mineral.name} className="text-gray-400 text-sm">
                  {mineral.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              {locations.map((location: string) => (
                <li key={location} className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin size={18} className="mt-1 shrink-0 text-[#c89b3c]" />
                  <span>{location}</span>
                </li>
              ))}
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={18} className="shrink-0 text-[#c89b3c]" />
                <span>{telephone}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={18} className="shrink-0 text-[#c89b3c]" />
                <span>{email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 PK5 Mining. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-[#c89b3c] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#c89b3c] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#c89b3c] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
