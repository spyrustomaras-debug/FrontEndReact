// components/CreateAuthorForm.tsx
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createAuthor } from "../features/authors/authorSlice";

const CreateAuthorForm = () => {
  const dispatch = useAppDispatch();
  const { creating, createdAuthor, error } = useAppSelector((state) => state.authors);

  const [name, setName] = useState("");
  const [books, setBooks] = useState([{ title: "" }]);

  const handleBookChange = (index: number, value: string) => {
    const updatedBooks = [...books];
    updatedBooks[index].title = value;
    setBooks(updatedBooks);
  };

  const addBookField = () => {
    setBooks([...books, { title: "" }]);
  };

  const removeBookField = (index: number) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createAuthor({ name, books }));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>Create Author</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Author Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
        </div>

        <div>
          <label>Books:</label>
          {books.map((book, index) => (
            <div key={index} style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}>
              <input
                type="text"
                value={book.title}
                onChange={(e) => handleBookChange(index, e.target.value)}
                required
                placeholder={`Book ${index + 1} title`}
              />
              <button type="button" onClick={() => removeBookField(index)} disabled={books.length === 1}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addBookField}>
            Add Book
          </button>
        </div>

        <button type="submit" disabled={creating} style={{ marginTop: "1rem" }}>
          {creating ? "Creating..." : "Create Author"}
        </button>
      </form>

      {createdAuthor && (
        <div style={{ marginTop: "1rem", background: "#e8ffe8", padding: "1rem", borderRadius: "4px" }}>
          <h4>Author Created:</h4>
          <p>Name: {createdAuthor.name}</p>
          <p>Books:</p>
          <ul>
            {createdAuthor.books.map((book: any) => (
              <li key={book.id}>{book.title}</li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "1rem", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default CreateAuthorForm;
