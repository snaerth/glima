import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { appDefault } from "../../utils/createMuiTheme";
import Title from "../Title";
import Container from "../Container";

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.primary.main
  },
  containerInner: {
    maxWidth: appDefault.pageWidthMax
  },
  h1: {
    color: theme.palette.common.white,
    [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
      paddingLeft: theme.spacing.unit
    },
    [theme.breakpoints.up(theme.breakpoints.values.md)]: {
      paddingLeft: theme.spacing.unit * 1.5
    },
    [theme.breakpoints.up(theme.breakpoints.values.lg)]: {
      paddingLeft: theme.spacing.unit * 3
    }
  }
});

function BannerSmall({ text, classes }) {
  return (
    <div className={classes.container}>
      <Container className={classes.containerInner}>
        <Title className={classes.h1}>{text}</Title>
      </Container>
    </div>
  );
}

BannerSmall.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
};

export default withStyles(styles)(BannerSmall);
