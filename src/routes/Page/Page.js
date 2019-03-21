import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import allowNull from "../../utils/propTypesHelpers";
import { getPage, setPagesLoading } from "../../actions/pages";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import BannerSmall from "../../components/BannerSmall";
import s from "./Page.module.scss";

class Page extends PureComponent {
  static propTypes = {
    page: allowNull(PropTypes.object.isRequired),
    error: allowNull(PropTypes.bool.isRequired),
    loading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      actions,
      post,
      match: {
        params: { id }
      }
    } = this.props;

    if (!post && id) {
      actions.setPagesLoading();
      actions.getPage(id);
    }
  }

  backButtonHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  renderNoPage() {
    return <NoData textCenter={false} />;
  }

  render() {
    const { page, error, loading } = this.props;

    if (loading) {
      return <Loading text="Sæki síðu..." />;
    }

    if (error || !page) {
      return this.renderNoPage();
    }

    const { content, title, _embedded } = page;
    let img = null;
    const featuredmedia = _embedded ? _embedded["wp:featuredmedia"] : null;

    if (
      featuredmedia &&
      featuredmedia[0] &&
      featuredmedia[0].media_details &&
      featuredmedia[0].media_details.sizes
    ) {
      img = featuredmedia[0].media_details.sizes.full.source_url;
    }

    return (
      <Fragment>
        <BannerSmall text={title.rendered} />
        <Container className={s.containerExtra}>
          {img && (
            <CardMedia
              alt={featuredmedia[0].alt_text || title.rendered}
              className={s.media}
              image={img}
              title={featuredmedia[0].alt_text || title.rendered}
            />
          )}
          <div>
            <Typography component="article">
              <span dangerouslySetInnerHTML={{ __html: content.rendered }} />
            </Typography>
            <div>
              <Button color="primary" onClick={this.backButtonHandler}>
                Til baka
              </Button>
            </div>
          </div>
        </Container>
      </Fragment>
    );
  }
}
/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @returns {Object}
 */
function mapStateToProps(state) {
  const {
    pages: { page, error, loading }
  } = state;

  return {
    page,
    error,
    loading
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
    actions: bindActionCreators({ getPage, setPagesLoading }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
