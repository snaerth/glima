import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { Mobile, Tablet, Desktop } from "../../components/Responsive";

const Title = ({ children }) => (
  <Fragment>
    <Desktop>
      <Typography variant="h2" gutterBottom>
        {children}
      </Typography>
    </Desktop>
    <Tablet>
      <Typography variant="h3" gutterBottom>
        {children}
      </Typography>
    </Tablet>
    <Mobile>
      <Typography variant="h4" gutterBottom>
        {children}
      </Typography>
    </Mobile>
  </Fragment>
);

Title.propTypes = {
  children: PropTypes.node.isRequired
};

export default Title;
