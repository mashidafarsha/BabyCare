import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">TRUE CARE</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Leading the way in medical excellence since 1992. Providing trusted care and advanced technology for your family's health.
            </p>
            <div className="flex gap-4 pt-2">
              {/* Social Icons with Hover Effects */}
              <a href="#" className="hover:text-blue-500 transition-colors"><i className="fab fa-facebook text-xl"></i></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-twitter text-xl"></i></a>
              <a href="#" className="hover:text-pink-500 transition-colors"><i className="fab fa-instagram text-xl"></i></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/department" className="hover:text-blue-400 transition-all hover:translate-x-1 inline-block">Our Specialities</Link></li>
              <li><Link to="/plans" className="hover:text-blue-400 transition-all hover:translate-x-1 inline-block">Health Plans</Link></li>
              <li><Link to="/doctors" className="hover:text-blue-400 transition-all hover:translate-x-1 inline-block">Find a Doctor</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-all hover:translate-x-1 inline-block">About Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-blue-400 cursor-pointer">Emergency Care 24/7</li>
              <li className="hover:text-blue-400 cursor-pointer">Online Consultation</li>
              <li className="hover:text-blue-400 cursor-pointer">Diagnostic Center</li>
              <li className="hover:text-blue-400 cursor-pointer">Pharmacy Services</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-blue-500">📍</span>
                <span>123 Health Ave, Medical City, <br />Kerala, India</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">📞</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✉️</span>
                <span>support@truecare.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 True Care Hospital. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;