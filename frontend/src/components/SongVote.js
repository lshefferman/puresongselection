import { useEffect, useContext } from "react";
import { SongsContext } from "../context/SongsContext";
import { UserContext } from "../context/UserContext";

const SongVote = () => {
  const { songs, dispatch } = useContext(SongsContext);
  const { user } = useContext(UserContext);

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

  const handleClick = async (song) => {
    const response = await fetch("/api/songs/" + song._id + "/vote", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Optional if your API uses auth tokens
        // Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({ userId: user._id }),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_SONG", payload: json });
    }
  };

  if (!songs) return <div>Loading songs...</div>;

  return (
    <div className="song-vote-list">
      <h3>Vote on Songs!</h3>
      {songs.length === 0 && <p>No songs to vote for yet.</p>}
      {songs.map((song) => (
        <div className="song-card" key={song._id}>
          <h4>{song.title}</h4>
          <p>
            <strong>Link:</strong> {song.link || "Unknown"}
          </p>
          <p>
            <strong>Votes:</strong> {song.votes.length}
          </p>
          <button
            onClick={() => handleClick(song)}
            // disabled={votesRemaining <= 0} (need to create separate vote context)
          >
            Vote
          </button>
        </div>
      ))}
    </div>
  );
};

export default SongVote;
