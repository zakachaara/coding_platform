"use client";
import { useRef, useState } from "react";
import styles from "./config.module.css";
import PopUp from "./PopUp";
export default function Configuration() {
  // Submit the xlsx file 
  const fileInputRef = useRef(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [type, setType] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];
    if (!file) {
      setType("alert")
      setResponseMessage("No file selected.");
      setTimeout(() => setResponseMessage("") , 5000);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/users/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json(); // Use .json() if the API returns JSON
      setType("success")
      setResponseMessage("Created " + data.length + "team(s)");
      setTimeout(() => setResponseMessage("") , 5000);

    } catch (error) {
      setType("alert")
      setResponseMessage("Error: " + error);
      setTimeout(() => setResponseMessage("") , 5000);

    }
  };
  // Submit the configuration changes 
  const handleConfigurationChange = async (e) => {
    e.preventDefault();

    const form = e.target;
    const startingDate = form["start-date"].value;
    const duration = form["duration"].value;
    const problems = form["problems"].value;

    const payload = {
      startingDate,
      duration,
      numberOfChallenges: parseInt(problems, 10),
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/configuration`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json(); // Or .json() if your API returns JSON
      console.log(data , JSON.stringify(payload))
      setType("success")
      setResponseMessage("New Configuration is Saved ");
      setTimeout(() => setResponseMessage("") , 5000);

    } catch (error) {
      setType("alert")
      setResponseMessage("Error: " + error);
      setTimeout(() => setResponseMessage("") , 5000);
    }
  };
  //  Add a team
  const handleAddTeam = async (e) => {
    e.preventDefault();

    const form = e.target;
    const login = form["login"].value;

    const payload = { login };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json(); // or .json() if applicable
      setType("success")
      setResponseMessage("Team was added: " + data.login);
      setTimeout(() => setResponseMessage("") , 5000);

      form.reset(); // Optional: clear the form
    } catch (error) {
      setType("alert")
      setResponseMessage("Error: " + error.message);
      setTimeout(() => setResponseMessage("") , 5000);
    }
  };
  const [teams , setTeams] = useState([]);
  const [showTable , setShowTable] = useState(false);

  const getListOfUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/users`);
      const data = await response.json();
      setTeams(data);
      setShowTable(true);
    } catch (error) {
      setResponseMessage("Error: " + error.message);
    }
  };
  return (
    <div className={styles.container}>
      {responseMessage && <PopUp message={responseMessage} type={type}/>}

      <form className={styles.settings} action="" method="post" onSubmit={handleConfigurationChange}>
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

        <form className={styles.add_team} action="" method="post" onSubmit={handleAddTeam}>
          <p className={styles.p_heading}>&gt; Add a team</p>
          <div className={styles.form_group}>
            <label className={styles.label} htmlFor="login">Login</label>
            <input className={styles.input_text} type="text" id="login"  required/>
          </div>
          <div className={styles.action_wrapper}>
            <button className={styles.btn}>add</button>
          </div>
        </form>
        <form action="" method="post" id="uploadForm" onSubmit={handleSubmit}>
        <div className={styles.upload_list}>
          <p className={styles.p_heading}>&gt; List of teams</p>
          <label className={styles.label} htmlFor="upload">Upload list</label>
          <input className={styles.input_file} type="file" id="upload" accept=".xlsx" required ref={fileInputRef}/>
        </div>
        <div className={styles.action_wrapper}>
          <button className={styles.btn} type="submit">upload</button>
        </div>
        </form>
        <div className={styles.all_teams}>
          <p className={styles.p_heading}>&gt; All Teams</p>
          <p className={styles.p_heading}>Return the list of all added teams</p>
        </div>
        <div className={styles.action_wrapper}>
          <button className={styles.btn} onClick={getListOfUsers}>get</button>
        </div>
      </section>
      {showTable && <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Teams</h3>
        <button className={styles.closeBtn} onClick={() => setShowTable(false)}>✕</button>
      </div>

      {teams.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Login</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.login}</td>
                <td>{row.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.message}>No teams found.</p>
      )}
    </div> }
    </div> 
  );
}
