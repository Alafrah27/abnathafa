import According from "../component/According";
import Contribiut from "../component/Contribiut";
import Footer from "../component/Footer";
import Hero from "../component/Hero";
import MembersSection from "../component/introduction";
import Introduction from "../component/introduction";
import Navbar from "../component/Navbar";
import PaymentLogo from "../component/PaymentLogo";
import ReviewUsers from "../component/ReviewUsers";
import Services from "../component/Services";

function Hompage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-2 items-center min-h-screen  w-full">
        <Hero />
        <MembersSection />
        <Contribiut />
        <Services />
        <PaymentLogo />
        <ReviewUsers />
        <According />
      </div>
      <Footer />
    </>
  );
}

export default Hompage;
