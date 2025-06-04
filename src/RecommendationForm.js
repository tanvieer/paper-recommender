import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Paper,
  Box,
  Fade,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const RecommendationForm = () => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [recommendations, setRecommendations] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/testrecommend", {
        title,
        abstract,
      });

      setRecommendations(response.data);
    } catch (err) {
      setError("Error fetching recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={8}
        sx={{
          p: 6,
          borderRadius: 5,
          background: "linear-gradient(135deg, #e3f2fd 0%, #fff 100%)",
          boxShadow: "0 12px 48px 0 rgba(31, 38, 135, 0.18)",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
          <AutoAwesomeIcon color="primary" sx={{ fontSize: 50, mr: 2 }} />
          <Typography variant="h3" fontWeight={800} color="primary">
            Paper Recommender
          </Typography>
        </Box>

        <Typography variant="h6" align="center" color="text.secondary" mb={4}>
          Get personalized research paper suggestions instantly!
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Paper Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  mb: 2,
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  "& .MuiInputBase-root": {
                    borderRadius: 1,
                  },
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Abstract"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  "& .MuiInputBase-root": {
                    borderRadius: 1,
                  },
                }}
                required
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" mt={4} mb={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{
                px: 6,
                py: 2,
                fontWeight: 700,
                fontSize: 20,
                borderRadius: 4,
                boxShadow: "0 2px 12px rgba(33,150,243,0.18)",
                "&:hover": {
                  backgroundColor: "#1976d2",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={32} color="inherit" />
              ) : (
                "Get Recommendations"
              )}
            </Button>
          </Box>
        </form>

        {error && (
          <Typography
            variant="body1"
            color="error"
            align="center"
            sx={{ mb: 2 }}
          >
            {error}
          </Typography>
        )}

        <Fade in={Object.keys(recommendations).length > 0}>
          <Box sx={{ mt: 5 }}>
            {Object.keys(recommendations).length > 0 && (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  color="primary"
                  fontWeight={700}
                  align="center"
                >
                  Recommendations:
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                  {Object.keys(recommendations).map((key, idx) => (
                    <Grid item xs={12} key={key}>
                      <Paper
                        elevation={3}
                        sx={{
                          p: 3,
                          background: idx % 2 === 0 ? "#bbdefb" : "#e3f2fd",
                          borderLeft: "8px solid #1976d2",
                          borderRadius: 3,
                          width: "100%",
                          boxSizing: "border-box",
                          "&:hover": {
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                          },
                        }}
                      >
                        <Typography variant="body1" fontWeight={600}>
                          {idx + 1}. {recommendations[key]}
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
