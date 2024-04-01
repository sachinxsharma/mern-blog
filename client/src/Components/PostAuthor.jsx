import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import Avatar from '../images/avatar1.jpg';
import axios from 'axios';
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


const PostAuthor = ({authorID,createdAt}) => {
  const [author, setAuthor] = useState({})

  useEffect(()=> {
    const getAuthor = async () => {
      try {
        console.log("Author Id:", authorID );
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`)
        console.log("response: ", response);
        setAuthor(response?.data);
      } catch (error) {
        console.log(error)
        
      }
    }
    getAuthor();
  },[])






  return (
    <Link to={'/posts/users/${authorID}'} className="post__author">
        <div className="post__author-avatar">
           <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`} alt="" />
        </div>
        <div className="post__author-details">
            <h3>By: {author?.name}</h3>
            <small><ReactTimeAgo date={new Date(createdAt)} locale="en-US"/></small>
        </div>
    </Link>
  )
}

export default PostAuthor