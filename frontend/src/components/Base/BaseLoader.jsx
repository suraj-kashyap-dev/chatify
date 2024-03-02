import React from "react";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="#6673ed" size={50} />
    </div>
  );
};

export default Loader;
