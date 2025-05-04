import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../contexts/AuthContext';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { Container, Typography, Box } from '@mui/material';
import { Navigate } from 'react-router-dom';

function Home() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/api/posts');
        setPosts(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    if (user?.role === 'user') {
      fetchPosts();
    }
  }, [user]);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts(posts.map(p => p._id === updatedPost._id ? updatedPost : p));
  };

  // 🔁 Redirect logic based on role
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  if (user?.role === 'judge') {
    return <Navigate to="/judge" replace />;
  }

  // ✅ Default user content
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Art Showcase Feed
      </Typography>
      {user && <PostForm onPostCreated={handlePostCreated} />}
      <Box>
        {posts.map(post => (
          <PostCard key={post._id} post={post} onUpdate={handlePostUpdate} />
        ))}
      </Box>
    </Container>
  );
}

export default Home;
