import SongForm from "../components/SongForm";
import SongList from "../components/SongList";

const Stage1 = () => {
  return (
    <div className="stage1">
      <h2>Stage 1: Song Suggestions</h2>
      <div className="song-form">
        <SongForm />
      </div>
      <div className="song-list">
        <SongList />
      </div>
    </div>
  );
};

export default Stage1;
