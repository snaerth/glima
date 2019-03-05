import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import search, { setSearchValue, setSearchLoading } from "../../actions/search";
import SearchResults from "../../components/SearchResults";
import Container from "../../components/Container";
import BannerSmall from "../../components/BannerSmall";

class Search extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    searchValue: PropTypes.string.isRequired
  };

  componentDidMount() {
    const { actions, match } = this.props;
    const { search } = match.params;

    if (search) {
      actions.setSearchLoading(true);
      actions.setSearchValue(search);
      actions.search(search);
    }
  }

  render() {
    return (
      <Fragment>
        <BannerSmall text="Leitarniðurstöður" />
        <Container>
          <SearchResults showExcerpt containerClass={false} />
        </Container>
      </Fragment>
    );
  }
}

Search.propTypes = {};

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @returns {Object}
 */
function mapStateToProps(state) {
  const {
    search: { value }
  } = state;

  return {
    searchValue: value
  };
}

/**
 * Maps dispatch to components props
 *
 * @param {Object} dispatch - Redux dispatch medhod
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { setSearchValue, search, setSearchLoading },
      dispatch
    )
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);
