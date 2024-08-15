import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="uncontrolled">Uncontrolled Form</NavLink>
        <NavLink to="controlled">Controlled Form</NavLink>
      </nav>
    </header>
  );
}

export default Header;
