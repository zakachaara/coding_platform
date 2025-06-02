// components/CPForm.js
import React from 'react';
import styles from "./cpForm.module.css"

const CPForm = ({ index, data, onChange, onFileChange }) => {
  const labelStyle = {
    fontWeight: 'bold',
  };

  

  return (
    <div className={styles.formBox}>
      <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>
        Challenge {index + 1}
      </h2>

      <div>
        <label style={labelStyle}>Pseudo Name:</label>
        <input
          type="text"
          className={styles.inputStyle}
          value={data.pseudoName}
          placeholder='e.g: A,B'
          onChange={(e) => onChange(index, 'pseudoName', e.target.value)}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Full Name:</label>
        <input
          type="text"
          className={styles.inputStyle}
          value={data.fullName}
          placeholder='e.g: The Magic Circle'
          onChange={(e) => onChange(index, 'fullName', e.target.value)}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Initial Score:</label>
        <input
          type="number"
          className={styles.inputStyle}
          value={data.initialScore}
          placeholder='300'
          onChange={(e) => onChange(index, 'initialScore', e.target.value)}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Zip File (must match pseudo-name):</label>
        <input
          type="file"
          accept=".zip"
          className={styles.inputStyle}
          onChange={(e) => onFileChange(index, e.target.files[0])}
          required
        />
      </div>
    </div>
  );
};

export default CPForm;
