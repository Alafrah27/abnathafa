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
import SEO from "../component/SEO";

function Hompage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-2 items-center min-h-screen  w-full">
        <SEO  title="ابناء طفع" description="ابناء طفع"/>
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
