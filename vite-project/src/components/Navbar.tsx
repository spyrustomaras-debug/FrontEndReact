// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "1rem", padding: 0, margin: 0 }}>
        <li><Link to="/profiles">Profiles</Link></li>
        <li><Link to="/authors">Authors</Link></li>
        <li>
          <Link to="/books/new">
            <button style={{ padding: "0.4rem 0.8rem", fontWeight: "bold", cursor: "pointer" }}>
              New Book
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
