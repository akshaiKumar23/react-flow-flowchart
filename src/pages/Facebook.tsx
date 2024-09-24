import FaceBookFlow from "../components/facebook/FaceBookFlow";
import Header from "../components/common/Header";

const Facebook = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Facebook Dashboard" />
      <FaceBookFlow />
    </div>
  );
};

export default Facebook;
