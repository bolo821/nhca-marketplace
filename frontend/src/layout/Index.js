import React, { useEffect, useState } from "react";
import Pages from "../route/Index";
import Head from "./head/Head";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const Layout = () => {
  //Sidebar
  const [visibility, setVisibility] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [themeState] = useState({
    main: "default",
    headerOption: "regular",
    header: "theme",
    skin: "light",
  });

  useEffect(() => {
    viewChange();
  }, []);

  //Adds classes to body
  useEffect(() => {
    document.body.className = `nk-body bg-lighter npc-invest has-touch nk-nio-theme ${
      themeState.skin === "dark" ? "dark-mode" : ""
    }`;
  }, [themeState, visibility]);

  // function to toggle sidebar
  const toggleSidebar = (e) => {
    e.preventDefault();
    if (visibility === false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };

  // function to change the design view under 1200 px
  const viewChange = () => {
    if (window.innerWidth < 992) {
      setMobileView(true);
    } else {
      setMobileView(false);
      setVisibility(false);
    }
  };
  window.addEventListener("load", viewChange);
  window.addEventListener("resize", viewChange);

  return (
    <React.Fragment>
      <Head title="Loading" />
      <div className="nk-app-root">
        <div className="nk-wrap">
          <Header
            visibility={visibility}
            toggleSidebar={toggleSidebar}
            mobileView={mobileView}
            theme={themeState.header}
            fixed={themeState.headerOption === "fixed" ? true : false}
          />
          <Pages />
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};
export default Layout;
