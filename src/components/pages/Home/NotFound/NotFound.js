import React from 'react';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div>
      <p className={styles.NotFoundMain}>404 NOT FOUND</p>
      <p className={styles.NotFoundText}>Nie znaleziono nic pod tym linkiem...</p>
    </div>
  )
}

export default NotFound;