import { useEffect, useState } from "react";
import axios from "axios";

interface Author {
  id: number;
  name: string;
}

const CreateBookForm = () => {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState<number | "">("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch authors on mount
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/authors/");
        setAuthors(res.data);
      } catch (err) {
        setError("Failed to load authors");
      }
    };
    fetchAuthors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      await axios.post("http://localhost:8000/api/books/", {
        title,
        author: authorId,
      });
      setSuccess(true);
      setTitle("");
      setAuthorId("");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error creating book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>Create New Book</h2>

      {success && <p style={{ color: "green" }}>Book created successfully!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Author:</label><br />
          <select
            value={authorId}
            onChange={(e) => setAuthorId(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          >
            <option value="">-- Select Author --</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Book"}
        </button>
      </form>
    </div>
  );
};

export default CreateBookForm;
