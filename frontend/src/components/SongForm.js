import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SongsContext } from "../context/SongsContext"; // Optional, if using

const SongForm = () => {
  const { user } = useContext(UserContext);
  const { dispatch } = useContext(SongsContext);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [requiredInstruments, setRequiredInstruments] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const song = {
      title,
      link,
      requiredInstruments: requiredInstruments.split(",").map((s) => s.trim()), // convert to array
      suggestedBy: user._id,
      leaderInstrument: user.instrument,
    };

    const response = await fetch("/api/songs", {
      method: "POST",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error || "Something went wrong");
      setEmptyFields(json.emptyFields || []);
    } else {
      setTitle("");
      setLink("");
      setRequiredInstruments("");
      setError(null);
      setEmptyFields([]);
      console.log("New song added:", json);
      dispatch({ type: "CREATE_SONG", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Suggest a New Song</h3>

      <label>Song Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Link:</label>
      <input
        type="text"
        onChange={(e) => setLink(e.target.value)}
        value={link}
        className={emptyFields.includes("link") ? "error" : ""}
      />

      <label>Required Instruments (comma-separated):</label>
      <input
        type="text"
        onChange={(e) => setRequiredInstruments(e.target.value)}
        value={requiredInstruments}
        className={emptyFields.includes("requiredInstruments") ? "error" : ""}
      />

      <button>Submit Song</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SongForm;
