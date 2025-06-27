import { ArrowUpCircle } from "lucide-react";
import { useEffect, useState } from "react";

function GoToTop() {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleScroll = () => {
    const scroll = 300;
    const windowScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (windowScroll > scroll) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="relative flex items-center justify-center z-50 ">
      {isScrolled && (
        <button
          onClick={() => handleScrollToTop()}
          className="fixed bottom-4 right-4 bg-blue-500 p-2 cursor-pointer rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          <ArrowUpCircle size={44} strokeWidth={1} className="text-white" />
        </button>
      )}
    </div>
  );
}

export default GoToTop;
