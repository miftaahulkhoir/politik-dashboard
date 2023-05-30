import React from "react";

const MarkerTriangle = ({ fill, children }) => {
  return (
    <div className="relative w-fit h-fit">
      <svg width="30" height="28" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.7198 3.31494C15.9707 1.14827 19.098 1.14827 20.3489 3.31494L33.6973 26.4349C34.9482 28.6016 33.3845 31.3099 30.8827 31.3099H4.18601C1.68416 31.3099 0.120507 28.6016 1.37143 26.4349L14.7198 3.31494Z"
          fill={fill}
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
      {children}
    </div>
  );
};

export default MarkerTriangle;
