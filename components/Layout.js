import Meta from "./Meta";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "../redux/actions/user";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  });
  return (
    <>
      <Meta />
      <Header />
      <ToastContainer position="bottom-right" />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
