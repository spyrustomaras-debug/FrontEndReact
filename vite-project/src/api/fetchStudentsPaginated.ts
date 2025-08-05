// src/api/fetchStudentsPaginated.ts
import axios from 'axios';

export const fetchStudentsPaginated = async ({ pageParam = 1 }) => {
  const res = await axios.get(`http://localhost:8000/api/students/?page=${pageParam}`);
  return res.data;
};