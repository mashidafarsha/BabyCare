import React, { useEffect, useState } from "react";
import { getBanner } from "../../sevices/userApi";
import { BaseUrl } from "../../constants/constants";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Shield } from "lucide-react";

function Banner() {
  const [bannerImage, setBannerImage] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    getAllBanner();
  }, []);

  useEffect(() => {
    if (bannerImage.length > 0 && !isHovered) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev === bannerImage.length - 1 ? 0 : prev + 1));
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [bannerImage, isHovered]);

  const getAllBanner = async () => {
    try {
      let { data } = await getBanner();
      if (data.success) {
        setBannerImage(data.BannerData);
      }
    } catch (error) {
      console.error("Banner fetch error", error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerImage.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === bannerImage.length - 1 ? 0 : prev - 1));
  };

  if (bannerImage.length === 0) return null;

  return (
    <div 
      className="relative w-full h-[500px] md:h-[700px] overflow-hidden bg-slate-50 mt-[70px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerImage.map((banner, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={`${BaseUrl}/${banner.image}`}
              className="w-full h-full object-cover"
              alt="Healthcare Banner"
            />
            
            {/* High-End Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>

            {/* Content Area */}
            <div className="absolute inset-0 flex items-center">
              <div className="section-container w-full">
                <div className={`max-w-2xl transition-all duration-1000 delay-300 ${currentSlide === index ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
                  <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest animate-fade-in">
                    <Shield size={14} /> World-Class Healthcare
                  </div>
                  
                  <h2 className="premium-heading mb-8 animate-slide-up">
                    {banner.bannerName || "Exceptional Care for Your Family"}
                  </h2>
                  
                  <p className="text-xl text-slate-600 mb-12 leading-relaxed font-medium animate-slide-up delay-200">
                    Experience the future of healthcare with TRUE CARE. Our specialized professionals and state-of-the-art facilities are dedicated to your well-being.
                  </p>
                  
                  <div className="flex flex-wrap gap-5 animate-slide-up delay-400">
                    <Link to="/department" className="btn-primary">
                      Book Appointment <ArrowRight size={20} />
                    </Link>
                    <Link to="/department" className="btn-secondary">
                      Explore Our Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {bannerImage.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur shadow-md rounded-full flex items-center justify-center text-slate-800 transition-all opacity-0 group-hover:opacity-100 z-10 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur shadow-md rounded-full flex items-center justify-center text-slate-800 transition-all opacity-0 group-hover:opacity-100 z-10 border border-slate-100"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {bannerImage.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 transition-all rounded-full ${currentSlide === i ? "w-8 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;