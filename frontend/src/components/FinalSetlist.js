import { useEffect, useState } from "react";

const FinalSetlist = () => {
  const [setlist, setSetlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSetlist = async () => {
      const response = await fetch("/api/songs/setlist");
      const json = await response.json();

      if (response.ok) {
        setSetlist(json);
        setLoading(false);
      }
    };

    fetchSetlist();
  }, []);

  if (loading) return <p>Loading final setlist...</p>;

  return (
    <div className="final-setlist">
      <h2>🎵 Final Setlist</h2>
      {setlist.length === 0 ? (
        <p>No songs were selected.</p>
      ) : (
        setlist.map((song) => (
          <div className="setlist-card" key={song._id}>
            <h3>{song.title}</h3>
            <p>
              <strong>Link:</strong>{" "}
              <a href={song.link} target="_blank" rel="noreferrer">
                {song.link}
              </a>
            </p>
            <p>
              <strong>Suggested by:</strong>{" "}
              {song.suggestedBy?.name || "Unknown"} (
              {song.suggestedBy?.instrument || "N/A"})
            </p>
            <p>
              <strong>Votes:</strong> {song.voteCount}
            </p>

            {song.assignedMembers && song.assignedMembers.length > 0 && (
              <div>
                <strong>Members:</strong>
                <ul>
                  {song.assignedMembers.map((member, index) => (
                    <li key={index}>
                      {member.user?.name || "Unknown"} — {member.instrument}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default FinalSetlist;
