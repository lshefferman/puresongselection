import { useContext } from "react";
import { SongsContext } from "../context/SongsContext";
import { UserContext } from "../context/UserContext";

const VoteStatus = () => {
  const { songs } = useContext(SongsContext);
  const { user } = useContext(UserContext);

  // Maximum number of votes alloted to each user (same in backend)
  const MAX_VOTES_PER_USER = 10;

  if (!songs || !user) return null;

  const votesUsed = songs.filter((song) =>
    song.votes.includes(user._id)
  ).length;

  const votesRemaining = MAX_VOTES_PER_USER - votesUsed;

  return (
    <div className="vote-status">
      <p>
        You have {votesRemaining} vote{votesRemaining !== 1 ? "s" : ""}{" "}
        remaining.
      </p>
    </div>
  );
};

export default VoteStatus;
