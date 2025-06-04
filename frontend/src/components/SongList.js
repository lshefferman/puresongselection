import { useEffect, useContext } from "react";
import { SongsContext } from "../context/SongsContext";

const SongList = () => {
  const { songs, dispatch } = useContext(SongsContext);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("/api/songs");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_SONGS", payload: json });
      }
    };

    fetchSongs();
  }, [dispatch]);

  if (!songs) return <div>Loading songs...</div>;

  return (
    <div className="song-list">
      <h3>Suggested Songs</h3>
      {songs.length === 0 && <p>No songs suggested yet.</p>}
      {songs.map((song) => (
        <div className="song-card" key={song._id}>
          <h4>{song.title}</h4>
          <p>
            <strong>Link:</strong> {song.link || "Unknown"}
          </p>
          <p>
            <strong>Leader:</strong> {song.suggestedBy?.name} (
            {song.leaderInstrument})
          </p>
          <p>
            <strong>Needed:</strong> {song.requiredInstruments.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SongList;
