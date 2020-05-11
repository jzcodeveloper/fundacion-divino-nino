import React, { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";

import { contributor, admin, all } from "./navigation";
import { selectUser } from "../../store/user/selectors";

import Header from "../../components/Common/CustomHeader";
import MobileHeader from "../../components/Common/CustomMobileHeader";

const Navbar = () => {
  const [size, setSize] = useState([0, 0]);
  const user = useSelector(selectUser);
  const mobile = size[0] < 700;

  useLayoutEffect(() => {
    setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", () =>
      setSize([window.innerWidth, window.innerHeight])
    );
  }, []);

  return !user && mobile ? (
    <MobileHeader items={all} />
  ) : !user && !mobile ? (
    <Header items={all} />
  ) : user.role === "contributor" && mobile ? (
    <MobileHeader items={contributor} />
  ) : user.role === "contributor" && !mobile ? (
    <Header items={contributor} />
  ) : user.role === "admin" && mobile ? (
    <MobileHeader items={admin} />
  ) : null;
};

export default Navbar;
