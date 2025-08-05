// src/components/Navbar.tsx
import { Link, Route, Routes } from 'react-router-dom';
import ProfileList from './ProfileList';
import Authors from './Authors';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/profiles">Profiles</Link></li>
        <li><Link to="/authors">Authors</Link></li>
      </ul>
      <Routes>
        <Route path="/profiles" element={<ProfileList />} />
        <Route path='/authors' element={<Authors/>}/>
      </Routes>
    </nav>
  );
};

export default Navbar;
