import React from "react";
import PropTypes from "prop-types";
import Posts from "../../components/Posts";
import Container from "../../components/Container";

function Home({ newsOnly }) {
  return (
    <Container>
      <Posts showPagination={newsOnly} moreButton={!newsOnly} />
    </Container>
  );
}

Home.defaultProps = {
  newsOnly: false
};

Home.propTypes = {
  newsOnly: PropTypes.bool
};

export default Home;
