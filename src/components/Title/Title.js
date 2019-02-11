import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import s from "./Title.module.scss";

const Title = ({ children }) => (
  <Typography variant="h3" className={s.title} gutterBottom>
    {children}
  </Typography>
);

Title.propTypes = {
  children: PropTypes.node.isRequired
};

export default Title;
