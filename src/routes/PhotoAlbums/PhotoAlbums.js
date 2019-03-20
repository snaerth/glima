import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import queryString from "query-string";
import getPhotos, {
  setPhotosLoading,
  setPhotosPage,
  setActiveAlbum
} from "../../actions/photos";
import PhotosGrid from "../../components/PhotosGrid";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import NoData from "../../components/NoData";
import BannerSmall from "../../components/BannerSmall";
import s from "./PhotoAlbums.module.scss";

class PhotoAlbums extends PureComponent {
  static defaultProps = {
    error: null
  };

  static propTypes = {
    actions: PropTypes.object.isRequired,
    photos: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    error: PropTypes.bool
  };

  componentDidMount() {
    const { actions, photos, page, location, history } = this.props;
    const qsPageParam = queryString.parse(location.search);
    const pageNumber = Number(qsPageParam.page);

    if (!photos || photos.length === 0) {
      actions.setPhotosLoading();

      if (qsPageParam.page) {
        actions.setPhotosPage(pageNumber);
        actions.getPhotos(null, pageNumber);
      } else {
        actions.setPhotosPage(pageNumber);
        actions.getPhotos(null, page);

        if (location.pathname.includes("/myndir")) {
          history.push("/myndir/?page=1");
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { actions, page, location } = this.props;
    const qsPageParam = queryString.parse(location.search);
    const pageNumber = Number(qsPageParam.page);

    if (pageNumber && pageNumber !== prevProps.page && pageNumber !== page) {
      actions.setPhotosLoading();

      if (qsPageParam.page) {
        actions.setPhotosPage(pageNumber);
        actions.getPhotos(null, pageNumber);
      } else {
        actions.getPhotos(null, page);
      }
    }
  }

  /**
   * Sets active album in Redux store and navigates
   * to /myndir/:slug/:id
   * @param {Number} id - Album id
   * @param {String} slug - Album slug
   */
  albumClickHandler = (id, slug) => {
    const { actions, history } = this.props;

    actions.setActiveAlbum(id, slug);

    // Navigates user to /myndir/:slug
    history.push(`/myndir/${slug}/${id}`);
  };

  /**
   * Changes pagination
   *
   * @param {Object} obj
   * @param {Number} obj.selected - Selected page in pagination
   */
  paginateHandler = ({ selected }) => {
    const { history } = this.props;
    const page = selected + 1;
    history.push(`/myndir/?page=${page}`);
  };

  render() {
    const { photos, error, loading, totalPages, page } = this.props;

    if (loading) {
      return <Loading text="Sæki myndir..." />;
    }

    if (error || !photos || photos.length === 0) {
      return <NoData textCenter={false} text="Við fundum engar myndir." />;
    }

    return (
      <Fragment>
        <BannerSmall text="Myndir úr starfinu" />
        <section className={s.container}>
          <div className={s.photosGridContainer}>
            <PhotosGrid photos={photos} onClick={this.albumClickHandler} />
          </div>
          <div className={s.paginationContainer}>
            <Pagination
              pageCount={totalPages}
              initialPage={page}
              onPageChangeHandler={this.paginateHandler}
            />
          </div>
        </section>
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
    photos: { data, error, loading, totalPages, page }
  } = state;

  return {
    photos: data,
    totalPages,
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
    actions: bindActionCreators(
      { getPhotos, setPhotosLoading, setPhotosPage, setActiveAlbum },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoAlbums);
