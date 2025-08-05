// src/hooks/useDeleteStudent.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:8000/api/students/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
