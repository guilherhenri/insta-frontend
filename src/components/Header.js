import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineInstagram, AiOutlineCamera } from 'react-icons/ai';

import './Header.css';

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/" className="div-logo">
          <AiOutlineInstagram size={25} color="#000" />
          <span>Instagram</span>
        </Link>
        <Link to="/new">
          <AiOutlineCamera size={25} color="#000" />
        </Link>
      </div>
    </header>
  );
}
