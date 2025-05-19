import { useState } from 'react';
import styles from './issue.module.css';

export default function Issue() {
  const [problem, setProblem] = useState('');
  const [recipient, setRecipient] = useState('option1');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Submit logic here
    console.log({ problem, recipient, comment });
    // Simulate API call
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div style={{fontFamily:"JetBrains Mono"}} className={styles.issueContainer}>
      <h1 className={styles.title}>Any Feedback or Question</h1>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Problem</label>
          <input
            type="text"
            className={styles.inputField}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Destinated to</label>
          <select
            className={styles.selectField}
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          >
            <option value="option1">Technical Support</option>
            <option value="option2">Challenge Feedback</option>
            <option value="option3">General Inquiry</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Your comment</label>
          <textarea
            className={styles.textareaField}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}