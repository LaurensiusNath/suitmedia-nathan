import React from "react";
import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gray-800">
      <img
        src={assets.banner}
        alt="Banner"
        className="absolute w-full h-full object-cover opacity-50"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Ideas</h1>
        <p className="text-lg md:text-xl lg:text-2xl mt-2">
          Where all our great things begin
        </p>
      </div>
    </div>
  );
};

export default Banner;
