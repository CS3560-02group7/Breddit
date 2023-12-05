import { Outlet } from "react-router-dom";
import Header from "./Header";
// Add the header or navbar or whatever when its ready

const Layout = () => {
  // filler data for currCommunity, logoSource, and userID props
  return (
    <div>
      <Header currCommunity="BreadCommunity" logoSource="src\assets\bredditPlaceholderLogo.png" userID="breadUserID" />
      <Outlet />
    </div>
  );
};

export default Layout;
