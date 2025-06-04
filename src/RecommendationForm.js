import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Grid, CircularProgress, Paper, Box } from '@mui/material';

const RecommendationForm = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [recommendations, setRecommendations] = useState({}); // Changed from [] to {}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle API request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/testrecommend', {
        title,
        abstract,
      });

      setRecommendations(response.data);
    } catch (err) {
      setError('Error fetching recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper style={{ padding: '20px', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Research Paper Recommender
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: '20px' }}
            required
          />
          <TextField
            label="Abstract"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            style={{ marginBottom: '20px' }}
            required
          />
          <Box display="flex" justifyContent="center" style={{ marginBottom: '20px' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              style={{ padding: '10px 30px' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Recommendations'}
            </Button>
          </Box>
        </form>

        {error && (
          <Typography variant="body2" color="error" align="center" style={{ marginBottom: '20px' }}>
            {error}
          </Typography>
        )}

        {Object.keys(recommendations).length > 0 && (
          <Box style={{ marginTop: '30px' }}>
            <Typography variant="h6" gutterBottom>
              Recommendations:
            </Typography>
            <Grid container spacing={2}>
              {Object.keys(recommendations).map((key) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Paper style={{ padding: '10px', backgroundColor: '#e3f2fd' }}>
                    <Typography variant="body1">{recommendations[key]}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default RecommendationForm;