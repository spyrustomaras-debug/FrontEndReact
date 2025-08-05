// src/hooks/useUpdateStudent.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type UpdatePayload = {
  id: number;
  data: {
    name: string;
  };
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdatePayload) => {
      await axios.put(`http://localhost:8000/api/students/${id}/`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
