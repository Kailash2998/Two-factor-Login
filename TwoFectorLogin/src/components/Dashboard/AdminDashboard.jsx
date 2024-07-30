import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:4005/users?role=student');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Student ID</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell align="center">{student.firstName}</TableCell>
                <TableCell align="center">{student.lastName}</TableCell>
                <TableCell align="center">{student.id}</TableCell>
                <TableCell align="center">{student.email}</TableCell>
                <TableCell align="center">
                  {Object.values(student.answers).reduce((acc, answer) => acc + answer, 0) / Object.keys(student.answers).length || 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard;
