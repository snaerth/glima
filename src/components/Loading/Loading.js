import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "../Container";
import s from "./Loading.module.scss";

function Loading({ text }) {
  return (
    <Container className={s.loadingContainer}>
      <CircularProgress />
      {text && <p>{text}</p>}
    </Container>
  );
}

Loading.defaultProps = {
  text: ""
};

Loading.propTypes = {
  text: PropTypes.string
};

export default Loading;
