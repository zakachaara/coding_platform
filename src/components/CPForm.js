// components/CPForm.js
import React from 'react';
import styles from "./cpForm.module.css"

const CPForm = ({ index, data, onChange, handleFileChange }) => {
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
      <div style={{display:"flex" , justifyContent:"space-between"}}>
        <div> 
        <label style={labelStyle}>Time limit (s):</label>
        <input
          type="number"
          className={styles.inputStyle}
          value={data.timeLimit}
          placeholder='1'
          onChange={(e) => onChange(index, 'timeLimit', e.target.value)}
          required
        />
        </div>
        <div>
        <label style={labelStyle}>Memory Limit (MB):</label>
        <input
          type="number"
          className={styles.inputStyle}
          value={data.memoryLimit}
          placeholder='256'
          onChange={(e) => onChange(index, 'memoryLimit', e.target.value)}
          required
        />
        </div>
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
          onChange={(e) => handleFileChange(index, e.target.files[0])}
          required
        />
        {data.zipFile && <span>Selected: {data.zipFile.name}</span>}
        
      </div>
    </div>
  );
};

export default CPForm;
