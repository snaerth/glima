import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import { Typography } from "@material-ui/core";
import allowNull from "../../utils/propTypesHelpers";
import formatDate from "../../utils/dateHelper";
import getPhotos, { setPhotosLoading } from "../../actions/photos";
import ImageGridList from "../../components/ImageGridList";
import Title from "../../components/Title";
import s from "./Photos.module.scss";

class Photos extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    photos: allowNull(
      PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
    ),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool
  };

  state = {
    activePhotosBatchIdx: 0,
    open: false,
    imageSrc: "",
    imageTitle: ""
  };

  componentDidMount() {
    const { actions, match, photos } = this.props;

    if (!photos || photos.length === 0) {
      actions.setPhotosLoading();
      actions.getPhotos(match.params.slug);
    }
  }

  handleClickOpen = ({ src, title }) => {
    this.setState({ open: true, imageSrc: src, imageTitle: title });
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };

  handleListItemClick(index) {
    this.setState({ activePhotosBatchIdx: index });
  }

  handleSelectChange = event => {
    this.setState({ activePhotosBatchIdx: event.target.value });
  };

  renderLoading() {
    return (
      <div className={classNames(s.container, s.loadingContainer)}>
        <CircularProgress />
        <p>Sæki myndir...</p>
      </div>
    );
  }

  renderNoPhotos() {
    return (
      <div className={classNames(s.container, s.textCenter)}>
        <h1>Engar myndir fundust</h1>
      </div>
    );
  }

  render() {
    const { photos, error, loading } = this.props;
    const { open, imageSrc, imageTitle } = this.state;

    if (loading) {
      return this.renderLoading();
    }

    if (error) {
      return this.renderNoPhotos();
    }

    if (!photos || photos.length === 0) {
      return this.renderNoPhotos();
    }

    return (
      <section className={s.container}>
        <header className={s.header}>
          <Title>{photos.title.rendered}</Title>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {formatDate(photos.date, false)}
          </Typography>
        </header>
        <ImageGridList
          key={photos.id}
          photos={photos.gallery_data.gallery}
          onClick={this.handleClickOpen}
        />
        <Dialog
          maxWidth="md"
          open={open}
          onClose={this.handleClickClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <img src={imageSrc} alt={imageTitle} className={s.modalImage} />
          </DialogContent>
        </Dialog>
      </section>
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
    photos: { error, loading, activeAlbum }
  } = state;

  return {
    photos: activeAlbum,
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
    actions: bindActionCreators({ getPhotos, setPhotosLoading }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withMobileDialog()(Photos));
