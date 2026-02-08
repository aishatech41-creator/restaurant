import { useState } from 'react';
import { Content, Sidenav, Stats } from '../../components';


const Dashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [element, setElement] = useState<JSX.Element>(<Stats />);
  return (
    <div className="h-screen w-full flex flex-col md:flex-row gap-2 items-start overflow-hidden bg-primary">
      <Sidenav activePage={activePage} setActivePage={setActivePage} setPageContent={setElement} />
      <Content pageTitle={activePage} Element={element} />
    </div>
  );
}


export default Dashboard;