import Header from "../components/common/Header";
import InstagramFlow from "../components/instagram/InstagramFlow";

const Instagram = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Instagram Dashboard" />
      <InstagramFlow />
    </div>
  );
};

export default Instagram;
