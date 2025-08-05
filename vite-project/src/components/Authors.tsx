import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAuthors } from "../features/authors/authorSlice";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const StatusText = styled.p<{ error?: boolean }>`
  color: ${(props) => (props.error ? "#e63946" : "#555")};
  font-weight: ${(props) => (props.error ? "bold" : "normal")};
`;

const AuthorList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

const AuthorItem = styled.li`
  background-color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f1f1;
  }
`;


const AuthorName = styled.span`
  flex-grow: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:focus {
    outline: 2px solid #333;
  }
`;

const UpdateButton = styled(Button)`
  background-color: #4caf50;
  color: white;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e63946;
  color: white;

  &:hover {
    background-color: #d32f2f;
  }
`;


// ... other styled components unchanged, omitted here for brevity

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  text-align: center;
`;

const ModalButtons = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const CancelButton = styled(Button)`
  background-color: #999;
  color: white;

  &:hover {
    background-color: #777;
  }
`;

const ViewButton = styled.button`
  background-color: #4CAF50;  /* Green */
  color: white;
  border: none;
  padding: 8px 12px;
  margin-top: 8px;  /* space above the button */
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;


const ConfirmDeleteButton = styled(DeleteButton)`
  width: 100px;
`;


const Authors = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.authors);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

    // Open modal with selected author ID
    const handleDeleteClick = (id: number) => {
      setAuthorToDelete(id);
      setDeleteError(null);
      setModalOpen(true);
    };
  
  // Close modal without deleting
  const closeModal = () => {
      setModalOpen(false);
      setAuthorToDelete(null);
      setDeleteError(null);
  };

  // Confirm deletion: call backend, refresh list on success
  const confirmDelete = async () => {
    if (authorToDelete === null) return;
    setDeleting(true);
    setDeleteError(null);

    try {
      await axios.delete(`http://localhost:8000/api/authors/${authorToDelete}/`);
      setModalOpen(false);
      setAuthorToDelete(null);
      dispatch(fetchAuthors()); // refresh list
    } catch (err: any) {
      setDeleteError(err.response?.data?.detail || "Failed to delete author");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const handleUpdate = (id: number) => {
    // Logic for update, e.g., navigate to edit page or open modal
    console.log("Update author with id:", id);
  };

  const handleView = (id: number) => {
    // Example: show alert or navigate to author details page
    console.log("View author with id:", id);
  };
  
  const handleDelete = (id: number) => {
    // Logic for delete, e.g., dispatch a redux action or call API
    console.log("Delete author with id:", id);
  };

  return (
    <Container>
      <Title>Authors</Title>
  
      {loading && <StatusText>Loading...</StatusText>}
      {error && <StatusText error>{error}</StatusText>}
  
      <AuthorList>
        {data.map((author) => (
          <AuthorItem key={author.id}>
            <AuthorName>{author.name}</AuthorName>
            <ButtonGroup>
              <UpdateButton onClick={() => handleUpdate(author.id)}>Update</UpdateButton>
              <DeleteButton onClick={() => handleDeleteClick(author.id)}>Delete</DeleteButton>
              <ViewButton onClick={() => handleView(author.id)}>View</ViewButton>
            </ButtonGroup>
          </AuthorItem>
        ))}
      </AuthorList>

      {modalOpen && (
        <ModalBackground>
          <ModalContent>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this author?</p>
            {deleteError && <StatusText error>{deleteError}</StatusText>}
            <ModalButtons>
              <CancelButton onClick={closeModal} disabled={deleting}>
                Cancel
              </CancelButton>
              <ConfirmDeleteButton onClick={confirmDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete"}
              </ConfirmDeleteButton>
            </ModalButtons>
          </ModalContent>
        </ModalBackground>
      )}
    </Container>
  );
  
};

export default Authors;
