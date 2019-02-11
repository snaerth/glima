import React from "react";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";

const TooltipComp = ({ children, title }) => (
  <Tooltip placement="top" title={title} interactive>
    {children}
  </Tooltip>
);

TooltipComp.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired
};

export default TooltipComp;
