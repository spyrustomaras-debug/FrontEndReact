// src/components/StudentDetail.tsx
import React from "react";
import { useStudent } from "../hooks/useStudent";
import { useParams, useNavigate } from "react-router-dom";


const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const studentId = Number(id);
  const navigate = useNavigate();
  const { data, isLoading, error } = useStudent(studentId);

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Student Detail</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>ID:</strong> {data.id}</p>
      {/* Add more fields if available */}

      <button onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>
        Go Back
      </button>
    </div>
  );
};

export default StudentDetail;
