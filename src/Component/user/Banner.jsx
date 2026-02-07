import React, { useEffect, useState } from "react";
import { getBanner } from "../../sevices/userApi";
import { BaseUrl } from "../../constants/constants";

function Banner() {
  const [bannerImage, setBannerImage] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    getAllBanner();
  }, []);

  // Auto-play logic (every 5 seconds)
  useEffect(() => {
    if (bannerImage.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev === bannerImage.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [bannerImage]);

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

  if (bannerImage.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden group">
      {/* Main Banner Wrapper */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-[300px] md:h-[500px]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerImage.map((banner, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img
              src={`${BaseUrl}/${banner.image}`}
              className="w-full h-full object-cover object-center"
              alt="Hospital Banner"
            />
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent flex items-center">
              <div className="container mx-auto px-10">
                <div className="max-w-xl text-white space-y-4 animate-in fade-in slide-in-from-left duration-1000">
                  <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                    {banner.bannerName || "World Class Healthcare"}
                  </h2>
                  <p className="text-lg opacity-90 hidden md:block">
                    Your health is our priority. Professional care you can trust.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg shadow-blue-500/30">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={() => setCurrentSlide(currentSlide === 0 ? bannerImage.length - 1 : currentSlide - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/50 p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
      >
        ❮
      </button>
      <button 
        onClick={() => setCurrentSlide(currentSlide === bannerImage.length - 1 ? 0 : currentSlide + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/50 p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
      >
        ❯
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerImage.map((_, i) => (
          <div 
            key={i} 
            className={`h-2 rounded-full transition-all ${currentSlide === i ? "w-8 bg-blue-600" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;