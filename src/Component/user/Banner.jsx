import React, { useEffect, useState } from "react";
import { getBanner } from "../../sevices/userApi";
import { BaseUrl } from "../../constants/constants";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Shield } from "lucide-react";

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

function Banner() {
  const [bannerImage, setBannerImage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBanner();
  }, []);

  const getAllBanner = async () => {
    try {
      let { data } = await getBanner();
      if (data.success) {
        setBannerImage(data.BannerData);
      }
    } catch (error) {
      console.error("Banner fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="w-full h-[500px] md:h-[700px] bg-slate-50 mt-[70px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Synchronizing Visual Assets...</p>
      </div>
    </div>
  );

  if (bannerImage.length === 0) return null;

  return (
    <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden bg-white mt-[70px] group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={bannerImage.length > 1}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        className="h-full w-full"
      >
        {bannerImage.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full relative">
              <img
                src={banner.image?.startsWith('http') ? banner.image : `${BaseUrl}/${banner.image}`}
                className="w-full h-full object-cover"
                alt={banner.bannerName || "Healthcare Banner"}
                loading="lazy"
              />
              
              {/* Content Area */}
              <div className="absolute inset-0 flex items-center z-20">
                <div className="section-container w-full">
                  <div className="max-w-2xl transform transition-all duration-1000">
                    <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                      <Shield size={14} strokeWidth={3} className="text-blue-400" /> <span className="drop-shadow-md">Certified Clinical Excellence</span>
                    </div>
                    
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-[0.9] mb-8 animate-in slide-in-from-left duration-1000 drop-shadow-[0_10px_10px_rgba(0,0,0,0.6)]">
                      {banner.bannerName || "Exceptional Care for Your Family"}
                    </h2>
                    
                    <p className="text-lg md:text-xl text-white mb-12 leading-relaxed font-bold italic border-l-4 border-blue-500 pl-8 max-w-xl animate-in slide-in-from-left duration-1000 delay-200 drop-shadow-[0_5px_5px_rgba(0,0,0,0.6)]">
                      {banner.description || "Experience the future of healthcare with TRUE CARE. Our specialized professionals and state-of-the-art facilities are dedicated to your well-being."}
                    </p>
                    
                    <div className="flex flex-wrap gap-5 animate-in slide-in-from-bottom duration-1000 delay-500">
                      <Link to="/department" className="group/btn bg-blue-600 hover:bg-white hover:text-blue-600 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center gap-3 transition-all shadow-2xl active:scale-95">
                        Book Appointment 
                        <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                      <Link to="/department" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-sm transition-all active:scale-95">
                        Clinical Services
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation */}
        {bannerImage.length > 1 && (
          <>
            <button className="swiper-button-prev-custom absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white backdrop-blur shadow-2xl rounded-full flex items-center justify-center text-slate-900 transition-all opacity-0 group-hover:opacity-100 z-30 border border-slate-100 active:scale-90 cursor-pointer">
              <ChevronLeft size={24} />
            </button>
            <button className="swiper-button-next-custom absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white backdrop-blur shadow-2xl rounded-full flex items-center justify-center text-slate-900 transition-all opacity-0 group-hover:opacity-100 z-30 border border-slate-100 active:scale-90 cursor-pointer">
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Custom Pagination */}
        <div className="custom-pagination absolute bottom-12 left-0 w-full flex justify-center gap-3 z-30"></div>
      </Swiper>

      {/* Styled JSX for Pagination */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
          border-radius: 4px;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          width: 32px;
          background: #2563eb;
        }
      `}} />
    </div>
  );
}

export default Banner;