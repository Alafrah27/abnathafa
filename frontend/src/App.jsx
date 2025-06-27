import { Route, Routes } from "react-router-dom";
import GoToTop from "./component/GoToTop";
import Hompage from "./pages/Hompage";
import PostsPage from "./pages/PostsPage";
import WritePost from "./pages/WritePost";
import LoginPage from "./pages/LoginPage";
import SiginUP from "./pages/SiginUP";
import PrivacyPolicy from "./pages/PolicyAgree";
import { ToastContainer } from "react-toastify";

import PricingComponent from "./pages/PricingPage";
import ReviewInputComponent from "./pages/AddRview";
import SuccessPayment from "./pages/SuccessPayment";
import CancellPayment from "./pages/CancellPayment";
import InvoicePayment from "./pages/InvoicePayment";
import MusdarAi from "./pages/MusdarAi";
import AboutUs from "./pages/AboutUs";
import PageNotFound from "./pages/PageNotFound";


function App() {

  return (
    <>

      {/* {cheeck athentication} */}
      <Routes>
        <Route path="/" element={<Hompage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/createpost" element={<WritePost />} />
        <Route path="/pricing" element={<PricingComponent />} />
        <Route path="/payment/:id" element={<InvoicePayment />} />
        <Route path="/musdarai" element={<MusdarAi />} />
        <Route path="/review" element={<ReviewInputComponent />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/success" element={<SuccessPayment />} />
        <Route path="/cancel" element={<CancellPayment />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SiginUP />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <GoToTop />


      <ToastContainer position="top-center" />

    </>

  );
}

export default App;
