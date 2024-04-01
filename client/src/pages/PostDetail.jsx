import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Thumbnail from "../images/blog22.jpg";
// import Loader from '../Components/Loader';
import Swal from 'sweetalert2';
import DeletePost from './DeletePost';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import PostAuthor from '../Components/PostAuthor';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        console.log(response)
        setPosts(response.data.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }
    getPosts();
  }, []);




  if (isLoading) {
    // return <Loader />
    let timerInterval;
Swal.fire({
  title: "we're working on it! ",
  html: "I will close in <b></b> milliseconds.",
  timer: 1000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("I was closed by the timer");
  }
});
  }

  return (
    <section className='post-detail'>
    {error && <p className='error'>{error}</p>}
    {post && 
  <div className="container post-details__container">
    <div className="post-detail__header">
      {/* <PostAuthor authorID={post.creator} createdAt={post.createdAt} /> */}
      {currentUser?.id == post?.creator && 
        <div className="post-detail__buttons">
          <Link to={`/posts/${post?._id}/edit`} className="btn sm primary">Edit</Link>
          <DeletePost postId={id}/>
        </div>
      }
    </div>
    <h1>{post.title}</h1>
    <div className='post-detail__thumbnail'>
      <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
    </div>
    <p dangerouslySetInnerHTML={{__html: post.description}}></p>
  </div>
}
    </section>
  );
};

export default PostDetail;
