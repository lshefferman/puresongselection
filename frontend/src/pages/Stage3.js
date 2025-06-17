import FinalSetlist from "../components/FinalSetlist";
import Navbar from "../components/Navbar";

const Stage3 = () => {
  return (
    <div className="stage3">
      <Navbar />
      <h2>Stage 3: Final Setlist and Assignments!</h2>
      <div className="final-setlist">
        <FinalSetlist />
      </div>
    </div>
  );
};

export default Stage3;
