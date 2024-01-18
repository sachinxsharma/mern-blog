import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../images/avatar1.jpg';
const PostAuthor = () => {
  return (
    <Link to={'/posts/users/sasa'} className="post__author">
        <div className="post__author-avatar">
            <img src={Avatar} alt="" />
        </div>
        <div className="post__author-details">
            <h3>By: sachin sharma</h3>
            <small>Just Now</small>
        </div>
    </Link>
  )
}

export default PostAuthor