// components/CPForm.js
import React from 'react';
import styles from "./cpForm.module.css"

const CTFForm = ({ index, data, onChange }) => {
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
        <label style={labelStyle}>Description:</label>
        <input
          type="paragraph"
          className={styles.inputStyle}
          value={data.description}
          placeholder='e.g: The Magic Circle'
          onChange={(e) => onChange(index, 'description', e.target.value)}
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
        <label style={labelStyle}>Flag:</label>
        <input
          type="text"
          className={styles.inputStyle}
          value={data.flag}
          placeholder='e.g: Aseds{my_flag_2025}'
          onChange={(e) => onChange(index, 'flag', e.target.value)}
          required
        />
      </div>
      <div>
        <label style={labelStyle}>Link to live app:</label>
        <input
          type="text"
          className={styles.inputStyle}
          value={data.link}
          placeholder='e.g: http://172.18.01.01:3000/'
          onChange={(e) => onChange(index, 'link', e.target.value)}
          required
        />
      </div>

    </div>
  );
};

export default CTFForm;
