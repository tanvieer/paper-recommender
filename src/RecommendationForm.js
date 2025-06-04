import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Grid, CircularProgress, Paper, Box, Fade } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const RecommendationForm = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [recommendations, setRecommendations] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <AutoAwesomeIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
          <Typography variant="h4" fontWeight={700} color="primary">
            Paper Recommender
          </Typography>
        </Box>

        <Typography variant="subtitle1" align="center" color="text.secondary" mb={3}>
          Get personalized research paper suggestions instantly!
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Paper Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2, background: '#fff' }}
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
            sx={{ mb: 3, background: '#fff' }}
            required
          />
          <Box display="flex" justifyContent="center" mb={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: 600,
                fontSize: 18,
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(33,150,243,0.15)',
              }}
            >
              {loading ? <CircularProgress size={28} color="inherit" /> : 'Get Recommendations'}
            </Button>
          </Box>
        </form>

        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Fade in={Object.keys(recommendations).length > 0}>
          <Box sx={{ mt: 4 }}>
            {Object.keys(recommendations).length > 0 && (
              <>
                <Typography variant="h6" gutterBottom color="primary" fontWeight={600}>
                  Recommendations:
                </Typography>
                <Grid container spacing={2}>
                  {Object.keys(recommendations).map((key, idx) => (
                    <Grid item xs={12} key={key}>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 2,
                          background: idx % 2 === 0 ? '#bbdefb' : '#e3f2fd',
                          borderLeft: '6px solid #1976d2',
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="body1" fontWeight={500}>
                          {recommendations[key]}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Box>
        </Fade>
      </Paper>
    </Container>
  );
};

export default RecommendationForm;