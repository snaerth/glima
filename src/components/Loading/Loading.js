import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "../Container";
import s from "./Loading.module.scss";

function Loading({ text, noMinHeight }) {
  return (
    <Container
      className={classNames(s.loadingContainer, {
        [s.noMinHeight]: noMinHeight
      })}
    >
      <CircularProgress />
      {text && <p>{text}</p>}
    </Container>
  );
}

Loading.defaultProps = {
  text: "",
  noMinHeight: false
};

Loading.propTypes = {
  text: PropTypes.string,
  noMinHeight: PropTypes.bool
};

export default Loading;
