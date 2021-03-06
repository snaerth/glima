import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Mobile, TabletAndUp } from "../Responsive";
import Container from "../Container";
import s from "./NoData.module.scss";

const HomeLink = props => <RouterLink to="/" {...props} />;
const NewsLink = props => <RouterLink to="/frettir/?page=1" {...props} />;
const EventsLink = props => <RouterLink to="/vidburdir/?page=1" {...props} />;
const PhotosLink = props => <RouterLink to="/myndir/?page=1" {...props} />;

function NoData({ text, textCenter, hideLinks }) {
  return (
    <Container
      className={classNames({
        [s.textCenter]: textCenter
      })}
    >
      <Mobile>
        <Typography variant="h3" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="h6" gutterBottom>
          {text}
        </Typography>
      </Mobile>
      <TabletAndUp>
        <Typography variant="h1" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="h5" gutterBottom>
          {text}
        </Typography>
      </TabletAndUp>
      {!hideLinks && (
        <Fragment>
          <Typography>Hérna eru hjálplegir hlekkir í staðinn:</Typography>
          <ul className={s.listContainer}>
            <li>
              <Link underline="hover" component={HomeLink}>
                Heim
              </Link>
            </li>
            <li>
              <Link underline="hover" component={NewsLink}>
                Fréttir
              </Link>
            </li>
            <li>
              <Link underline="hover" component={EventsLink}>
                Viðburðir
              </Link>
            </li>
            <li>
              <Link underline="hover" component={PhotosLink}>
                Myndir
              </Link>
            </li>
          </ul>
        </Fragment>
      )}
    </Container>
  );
}

NoData.defaultProps = {
  text: "Við fundum ekki það sem þú varst að leita að.",
  textCenter: false,
  hideLinks: false
};

NoData.propTypes = {
  text: PropTypes.string.isRequired,
  textCenter: PropTypes.bool,
  hideLinks: PropTypes.bool
};

export default NoData;
