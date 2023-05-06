import React, { useEffect, useState } from "react";
import { getBanner } from "../../sevices/adminApi";
function Banner() {
  const [bannerImage, setBannerImage] = useState([]);

  useEffect(() => {
    getAllBanner();
  }, []);

  const getAllBanner = async () => {
    try {
      let { data } = await getBanner();
      console.log(data, "llll");
      if (data.success) {
        setBannerImage(data.BannerData);
      }
    } catch {}
  };

  return (
    <div className="m-4 mx-auto shadow-2xl ">
      <div className="carousel rounded-2xl">
        {bannerImage.map((banner, index) => {
          return (
            <div
              key={banner.id}
              id={`slide${index + 1}`}
              className="relative w-full carousel-item h-fit"
            >
              <img
                src={
                  banner.image ? `http://localhost:4000/${banner.image}` : ""
                }
                className="w-full h-96"
                alt="image"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#slide${index}`} className="text-slate-400">
                  ❮
                </a>
                <a href={`#slide${index + 2}`} className="text-slate-400">
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Banner;
