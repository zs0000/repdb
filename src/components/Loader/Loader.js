import React from "react";
import s from "./Loader.module.css"; // Import your css

const Loader = () => {
  return (
    <div className={s.spinnercontainer}>
      <div className={s.spinner}></div>
    </div>
  );
};

export default Loader;