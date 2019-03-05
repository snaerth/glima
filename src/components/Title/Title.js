import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { Mobile, Tablet, Desktop } from "../../components/Responsive";

const Title = ({ children, className }) => (
  <Fragment>
    <Desktop>
      <Typography variant="h2" gutterBottom className={className}>
        {children}
      </Typography>
    </Desktop>
    <Tablet>
      <Typography variant="h3" gutterBottom className={className}>
        {children}
      </Typography>
    </Tablet>
    <Mobile>
      <Typography variant="h4" gutterBottom className={className}>
        {children}
      </Typography>
    </Mobile>
  </Fragment>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Title;
