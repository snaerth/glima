import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post';

const Posts = ({ posts }) => {
  if (posts && posts.length > 0) {
    return posts.map(post => <Post key={post.id} data={post} />);
  }

  return null;
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
