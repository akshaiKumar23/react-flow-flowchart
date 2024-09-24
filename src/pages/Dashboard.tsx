import Header from "../components/common/Header";
import Flow from "../Flow";

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Dashboard" />
      <Flow />
    </div>
  );
};

export default Dashboard;
