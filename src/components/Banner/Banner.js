import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Logo } from "../../assets/img/glima_logo.svg";
import s from "./Banner.module.scss";

function Banner() {
  return (
    <div className={s.container}>
      <Logo className={s.logo} />
    </div>
  );
}

Banner.propTypes = {};

export default Banner;
