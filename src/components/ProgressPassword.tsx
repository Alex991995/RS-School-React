import React from 'react';
import styles from '../styles/ProgressPassword.module.css';
import stylesForm from '../styles/Form.module.css';

interface ProgressPasswordProps {
  password: string | undefined;
}

function ProgressPassword({ password }: ProgressPasswordProps) {
  if (!password) return <span className={stylesForm.progress}></span>;
  let score = 0;

  if (!password) return '';
  if (password.length > 8) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  function calculateStraightPassword() {
    if (score === 0 || score <= 2) {
      return <span className={styles.weakPass}>Weak</span>;
    } else if (score === 3) {
      return <span className={styles.mediumPass}>Medium</span>;
    }
    return <span className={styles.strongPass}>Strong</span>;
  }

  return (
    <div className={stylesForm.progress}>
      <div className={styles['progress-bar']}></div>
      <small>Password strength: {calculateStraightPassword()}</small>
    </div>
  );
}

export default ProgressPassword;
