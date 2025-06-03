const ProblemsTable = ({problems , name}) => {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Problems ({name} Room)</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Time Limit</th>
              <th style={thStyle}>Memory Limit</th>
              <th style={thStyle}>Initial Score</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr key={index}>
                <td style={tdStyle}>{problem.name}</td>
                <td style={tdStyle}>{problem.description}</td>
                <td style={tdStyle}>{problem.time_limit}</td>
                <td style={tdStyle}>{problem.memory_limit}</td>
                <td style={tdStyle}>{problem.initial_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  const thStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    background: '#f4f4f4',
    fontWeight: 'bold',
  };
  
  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
  };

export default ProblemsTable;