import React from "react";
import { ReactComponent as Logo } from "../../assets/img/glima_logo.svg";
import s from "./Banner.module.scss";

function Banner() {
  return (
    <div className={s.container}>
      <Logo className={s.logo} />
    </div>
  );
}

export default Banner;
