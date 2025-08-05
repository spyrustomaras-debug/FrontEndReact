import { useQuery } from '@tanstack/react-query';

export interface Student {
  id: number;
  name: string;
  // Add other fields based on your API response
}

const fetchStudents = async (): Promise<Student[]> => {
  const res = await fetch('http://localhost:8000/api/students/');
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
};

export const useStudents = () => {
  return useQuery<Student[]>({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });
};