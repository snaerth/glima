import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import s from "./Container.module.scss";

function Container({ children, className }) {
  return <div className={classNames(s.container, className)}>{children}</div>;
}

Container.defaultProps = {
  className: ""
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Container;
