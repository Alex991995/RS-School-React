import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Header.module.css';

function Header() {
  const isActive = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'active-link' : '';
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink className={isActive} to="uncontrolled">
          Uncontrolled Form
        </NavLink>
        <NavLink className={isActive} to="controlled">
          Controlled Form
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
