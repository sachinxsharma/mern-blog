import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import Loader from '../Components/Loader';

const DeletePost = ({ postId: id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const removePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.log("Couldn't delete Post.", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Link className='btn sm danger' onClick={removePost}>
      Delete
    </Link>
  );
};

export default DeletePost;
