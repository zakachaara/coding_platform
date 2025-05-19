import styles from "./config.module.css";
export default function Configuration() {
  return (
    <div className={styles.container}>
      <form className={styles.settings} action="" method="post">
        <h2>1. General settings</h2>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="start-date">
            Starting date
          </label>
          <input className={styles.input_date} type="datetime-local" id="start-date" required />
        </div>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="duration">Duration</label>
          <input className={styles.input_text} type="time" id="duration" defaultValue="04:00"  />
        </div>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="problems">Problems/room</label>
          <input className={styles.input_text} type="text" id="problems" defaultValue="3" />
        </div>
        <div className={styles.action_wrapper}>
          <button className={styles.btn}>save</button>
        </div>
      </form>

      <section className={styles.teams}>
        <h2>2. Teams management</h2>

        <form className={styles.add_team} action="" method="post">
          <p className={styles.p_heading}>&gt; Add a team</p>
          <div className={styles.form_group}>
            <label className={styles.label} htmlFor="login">Login</label>
            <input className={styles.input_text} type="text" id="login"  required/>
          </div>
          <div className={styles.form_group}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input className={styles.input_text} type="password" id="password" required/>
          </div>
          <div className={styles.action_wrapper}>
            <button className={styles.btn}>add</button>
          </div>
        </form>
        <form action="" method="post">
        <div className={styles.upload_list}>
          <p className={styles.p_heading}>&gt; List of teams</p>
          <label className={styles.label} htmlFor="upload">Upload list</label>
          <input className={styles.input_file} type="file" id="upload" accept=".xlsx" required/>
        </div>
        <div className={styles.action_wrapper}>
          <button className={styles.btn}>upload</button>
        </div>
        </form>
        <div className={styles.all_teams}>
          <p className={styles.p_heading}>&gt; All Teams</p>
          <p className={styles.p_heading}>Return the list of all added teams</p>
        </div>
        <div className={styles.action_wrapper}>
          <button className={styles.btn}>get</button>
        </div>
      </section>
    </div>
  );
}
