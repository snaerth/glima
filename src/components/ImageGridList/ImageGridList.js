import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Mobile, Tablet, Desktop } from '../Responsive';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: 992,
    height: 'auto'
  },
  img: {
    cursor: 'pointer'
  }
};

class ImageGridList extends PureComponent {
  imageClickHandler = e => {
    const { onClick } = this.props;

    onClick({
      src: e.target.src,
      title: e.target.alt,
      id: e.target.getAttribute('data-id')
    });
  };

  renderPhotos() {
    const { classes, photos } = this.props;

    return photos.map(photo => (
      <GridListTile key={photo.id} cols={1}>
        <img
          data-id={photo.id}
          src={photo.src}
          alt={photo.title}
          onClick={this.imageClickHandler}
          className={classes.img}
        />
      </GridListTile>
    ));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Mobile>
          <GridList cellHeight={200} className={classes.gridList} cols={1}>
            {this.renderPhotos()}
          </GridList>
        </Mobile>
        <Tablet>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {this.renderPhotos()}
          </GridList>
        </Tablet>
        <Desktop>
          <GridList cellHeight={160} className={classes.gridList} cols={4}>
            {this.renderPhotos()}
          </GridList>
        </Desktop>
      </div>
    );
  }
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  photos: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(ImageGridList);
