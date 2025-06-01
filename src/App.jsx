import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "./utils/localStorage";

const Home = lazy(() => import("./pages/Home"));
const Collection = lazy(() => import("./pages/Collection"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const Orders = lazy(() => import("./pages/Orders"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Profile = lazy(() => import("./pages/Profile"));
const Wishlist = lazy(() => import("./pages/WishList"));


const App = () => {

  const haveAccess = (page) => {
    console.log("getAuthToken()", getAuthToken());

    if (getAuthToken()) {
      return page;
    } else {
      return <Navigate to={"/login"} />
    }
  }

  return (
    <div>
      <ToastContainer />
      <NavBar />
      {/* <SearchBar /> */}
      <main className="w-full sm:max-w-[90%] mx-auto">
        <Suspense
          fallback={<div className="text-center py-10">Loading...</div>}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={haveAccess(<Cart />)} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={haveAccess(<PlaceOrder />)} />
            <Route path="/orders" element={haveAccess(<Orders />)} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={haveAccess(<Profile />)} />
            <Route path="/wishlist" element={haveAccess(<Wishlist />)} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
