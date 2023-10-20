import { Outlet } from "react-router-dom";
// import Header from "./Header";
// Add the header or navbar or whatever when its ready

const Layout = () => {

  return (
    <div>
      {/* <Header /> */}
      <Outlet />
    </div>
  );
};

export default Layout;
