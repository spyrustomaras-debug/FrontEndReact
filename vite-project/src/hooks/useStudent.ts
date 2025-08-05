// src/hooks/useStudent.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchStudentById = async (id: number) => {
  const response = await axios.get(`http://localhost:8000/api/students/${id}/`);
  return response.data;
};

export const useStudent = (id: number) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: () => fetchStudentById(id),
    enabled: !!id, // only run when id is truthy
  });
};
