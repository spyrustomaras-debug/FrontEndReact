import React, { useEffect, useRef } from 'react';
import { useStudentsPaginated } from '../hooks/useStudentsPaginated';
import { useDeleteStudent } from '../hooks/useDeleteStudent';
import { useUpdateStudent } from "../hooks/useUpdateStudent";
import { useNavigate } from "react-router-dom";

const StudentList: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useStudentsPaginated();

  const deleteMutation = useDeleteStudent();
  const updateMutation = useUpdateStudent();
  const navigate = useNavigate();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver to auto-load next page
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  const handleView = (id: number) => {
    navigate(`/students/${id}`);
  };

  const handleUpdate = (id: number) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      updateMutation.mutate({ id, data: { name: newName } });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data?.pages.map((page) =>
          page.results.map((student) => (
            <li key={student.id} style={{ marginBottom: "1rem" }}>
              <strong>{student.name}</strong>
              <div style={{ marginTop: "0.5rem" }}>
                <button onClick={() => handleView(student.id)} style={{ marginRight: "0.5rem" }}>
                  View
                </button>
                <button onClick={() => handleUpdate(student.id)} style={{ marginRight: "0.5rem" }}>
                  Update
                </button>
                <button onClick={() => handleDelete(student.id)} style={{ color: "red" }}>
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Observer target */}
      <div ref={loadMoreRef} style={{ height: "1px" }} />

      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default StudentList;
