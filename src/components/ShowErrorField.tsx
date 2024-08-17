import React from 'react';
import styles from '../styles/UncontrolledForm.module.css';

interface ShowErrorFieldProps {
  error: string | undefined;
}

function ShowErrorField({ error }: ShowErrorFieldProps) {
  if (!error) return <span className={styles.error}></span>;
  return <span className={styles.error}>{error}</span>;
}

export default ShowErrorField;
