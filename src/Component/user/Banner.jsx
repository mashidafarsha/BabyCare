import React, { useEffect, useState } from "react";
import { getBanner } from "../../sevices/adminApi";
import { BaseUrl } from "../../constants/constants";
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
    <div className="m-6 mx-auto mt-5 shadow-2xl ">
      <div className="carousel rounded-2xl">
        {bannerImage.map((banner, index) => {
          return (
            <div
              key={banner.id}
              id={`slide${index + 1}`}
              className="relative w-full carousel-item md:h-fit sm:h-48 sm:object-cover"
            >
              <img
                src={
                  banner.image ? `${BaseUrl}/${banner.image}` : ""
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
