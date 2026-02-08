import CategoryCards from "./CategoryCards";

const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
        <CategoryCards />
        <CategoryCards />
        <CategoryCards />
        <CategoryCards />
      </div>
    </div>
  );
};

export default Dashboard;
