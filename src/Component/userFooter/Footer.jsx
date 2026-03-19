import React from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand and Intro */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <HeartPulse size={24} className="text-blue-600" />
              <span className="text-xl font-bold text-slate-800 tracking-tight">TrueCare</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Leading the way in medical excellence. We provide trusted healthcare solutions and specialized medical services to ensure your well-being.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Specialities", path: "/department" },
                { name: "Health Plans", path: "/plans" },
                { name: "Our Doctors", path: "/doctors" },
                { name: "About Us", path: "/about" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-6">Services</h3>
            <ul className="space-y-4">
              {[
                "24/7 Emergency Care",
                "Online Consultations",
                "Laboratory Tests",
                "Health Checkups",
              ].map((service, idx) => (
                <li key={idx} className="text-sm text-slate-500">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-600 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-500">123 Clinical Drive, Kochi, Kerala, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-600 shrink-0" />
                <span className="text-sm text-slate-500">+91 484 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600 shrink-0" />
                <span className="text-sm text-slate-500">hello@truecare.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-xs text-slate-400">
            © 2026 TrueCare Medical Group. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, idx) => (
              <a key={idx} href="#" className="text-xs text-slate-400 hover:text-blue-600 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
;