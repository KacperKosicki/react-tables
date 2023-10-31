import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Tables.module.scss'; // Zaimportuj plik ze stylami

const Tables = () => {
  const tables = useSelector(state => state.tables) || [];

  return (
    <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">All tables</h1>
      </div>
      {tables.map(table => (
        <div key={table.id} className={`mb-4 ${styles.tableTitle}`}>
          <div className={styles.title}>
            <h2 id={`table-${table.id}`} className="mb-0">Table {table.id}</h2>
          </div>
          <div className={styles.status}>
            <span>Status: </span>{table.status}
          </div>
          <div className={styles.buttonWrapper}>
            <Link to={`/table/${table.id}`}>
              <Button variant="primary">Show More</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tables;