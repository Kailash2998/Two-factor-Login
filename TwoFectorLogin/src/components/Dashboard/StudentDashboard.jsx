import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Typography, Box } from '@mui/material';
import Slider from '@mui/material/Slider';
import { toast } from 'react-toastify';

const StudentDashboard = () => {
  const { userId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:4005/questions');
        const shuffledQuestions = response.data.sort(() => 0.5 - Math.random()).slice(0, 6);
        setQuestions(shuffledQuestions);
      } catch (error) {
        toast.error('Error fetching questions');
      }
    };

    fetchQuestions();
  }, []);

  const handleSliderChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`http://localhost:4005/users/${userId}`, { answers });
      setSubmitted(true);
      toast.success('Congratulations! You have completed the questionnaire.');
    } catch (error) {
      toast.error('Error submitting answers');
    }
  };

  return (
    <Box
      style={{
        background: 'linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url("/path/to/your/background-image.jpg")',
        backgroundSize: 'cover',
        maxHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px',
        overflow: 'hidden', 
      }}
    >
      <Container maxWidth="md">
        <Box mt={4} mb={4} bgcolor="white" p={4} borderRadius={8} boxShadow={3}>
          <Typography variant="h4" align="center" gutterBottom>
            Student Dashboard
          </Typography>
          {!submitted && questions.length > 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Question {currentQuestionIndex + 1} of {questions.length}
              </Typography>
              <Typography variant="body1">{questions[currentQuestionIndex].text}</Typography>
              <Slider
                value={answers[questions[currentQuestionIndex].id] || 0}
                onChange={(e, value) => handleSliderChange(questions[currentQuestionIndex].id, value)}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                step={1}
                marks={[
                  { value: 0, label: 'Not at all' },
                  { value: 1, label: 'Partially disagree' },
                  { value: 2, label: 'Neutral' },
                  { value: 3, label: 'Partially agree' },
                  { value: 4, label: 'Agree' },
                  { value: 5, label: 'Totally agree' }
                ]}
              />
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Next
                </Button>
              </Box>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </Box>
          )}
          {submitted && (
            <Typography variant="h5" align="center" mt={4}>
              Congratulations! You have completed the questionnaire.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default StudentDashboard;
