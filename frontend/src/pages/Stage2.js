import SongVote from "../components/SongVote";
import VoteStatus from "../components/VoteStatus";

const Stage2 = () => {
  return (
    <div className="stage2">
      <h2>Stage 2: Song Voting</h2>
      <div className="vote-status">
        <VoteStatus />
      </div>
      <div className="song-vote">
        <SongVote />
      </div>
    </div>
  );
};

export default Stage2;
