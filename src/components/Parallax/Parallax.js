import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import parallaxStyle from "./ParallaxStyle";

const Background = ({
  classes,
  filter,
  className,
  children,
  style,
  image,
  small
}) => {
  const parallaxClasses = classNames({
    [classes.background]: true,
    [classes.filter]: filter,
    [classes.small]: small,
    [className]: className !== undefined
  });

  return (
    <div
      className={parallaxClasses}
      style={{
        ...style,
        backgroundImage: "url(" + image + ")"
      }}
    >
      {children}
    </div>
  );
};

Background.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string
};

export default withStyles(parallaxStyle)(Background);
