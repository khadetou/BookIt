import Meta from "./Meta";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Layout = ({ children }) => {
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
