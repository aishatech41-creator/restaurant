
import Dashboard from "./Dashboard";
import Home from "../Home";
import { useStateValue } from "../../context/StateProvider";
import { isAdmin } from "../../utils/functions";

const Admin = () => {
  const [{ user }] = useStateValue()

  // DEBUG: Temporary diagnostic
  // import { useEffect } from "react"; 
  // Note: Since I can't easily add the import in this block without messing up the whole file, 
  // I will assume specific user interaction is better than breaking the file with missing import.
  // Actually, I'll just change the render logic to PRINT the error on screen instead of <Home />

  return (
    <>
      {isAdmin(user) ? <Dashboard /> : (
        <div className="pt-24 px-10 text-center">
          <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
          <p>You are logged in as: {user?.email} ({user?.displayName})</p>
          <p>Role Check: {JSON.stringify({
            role: user?.role,
            nestedRole: user?.user?.role,
            isAdmin: isAdmin(user)
          }, null, 2)}</p>
          <Home />
        </div>
      )}
    </>
  );
};

export default Admin;
