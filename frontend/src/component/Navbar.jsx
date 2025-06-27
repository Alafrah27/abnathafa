import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, X, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { UseLogout, UserInfo } from "../services/useAuth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchopen, setSearchopen] = useState(false);
  const navigate = useNavigate()
  const { User } = UserInfo();
  const { logout, isPending } = UseLogout()

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;
      if (isOpen && !target.closest('.mobile-sidebar') && !target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Prevent scrolling when sidebar is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="bg-white flex flex-col items-center h-[70px] p-3 fixed top-0 w-full z-50 shadow-md">
      <nav className="container mx-auto flex justify-between items-center h-full relative">
        {/* Left Section: Search & Login */}
        <img src="/logo.png" alt="logo" className="w-[100px] cursor-pointer" />

        {/* Center Navigation */}
        <ul className="hidden lg:flex items-center gap-5 relative">
          {/* المساعدة مع قائمة منسدلة */}
          <li>
            <Link to="/" className="text-blue-600 hover:underline cursor-pointer">
              الرئيسية
            </Link>
          </li>


          <li>
            <Link to="/posts" className="text-blue-600 hover:underline cursor-pointer">
              المدونة
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="text-blue-600 hover:underline cursor-pointer">
              نبذة عنا
            </Link>
          </li>
          <li>
            <Link to="/review" className="text-blue-600 hover:underline cursor-pointer">
              التقيمات
            </Link>
          </li>
          <li>
            <Link to="/pricing" className="text-blue-600 hover:underline cursor-pointer">
              الدفع
            </Link>
          </li>

          <li className="relative group">
            <button className="text-blue-600 hover:underline cursor-pointer">
              المساعدة
            </button>
            {/* Dropdown menu */}
            <div className="absolute hidden group-hover:block right-0 bg-white shadow-lg rounded-b-lg w-[300px] z-10 flex-col items-center p-8">
              <a
                href="tel:00966555475591"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-8 py-2 text-blue-600 hover:bg-gray-100"
              >
                اتصل بنا
              </a>
              <Link to="/" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">
                عن رابطة
              </Link>
              <Link to="/" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">
                الخصوصية
              </Link>

              <Link to="/" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">
                الشروط والاحكام
              </Link>
            </div>
          </li>
        </ul>

        <div className="flex gap-4 items-center px-3 lg:px-0">
          {/* Mobile Sidebar */}
          <div
            className={`mobile-sidebar fixed top-0 right-0 w-[280px] h-screen bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            {/* Sidebar Header */}
            <div className="flex flex-reverse justify-between items-center p-4 border-b">
              <img src="/logo.png" alt="logo" className="w-[80px]" />
              <X
                className="text-blue-600 cursor-pointer"
                size={24}
                role="button"
                onClick={() => setIsOpen(false)}
              />
            </div>

            {/* Sidebar Content */}
            <div className="p-4">
              <ul className="space-y-4">
                <li className="border-b pb-3">
                  <Link to="/" className="text-blue-600 hover:text-blue-800 text-lg block">
                    الرئيسية
                  </Link>
                </li>

                <li className="border-b pb-3">
                  <Link to="/posts" className="text-blue-600 hover:text-blue-800 text-lg block">
                    المدونة
                  </Link>
                </li>
                <li className="border-b pb-3">
                  <Link to="/aboutus" className="text-blue-600 hover:text-blue-800 text-lg block">
                    نبذة عنا
                  </Link>
                </li>
                <li className="border-b pb-3">
                  <Link to="/review" className="text-blue-600 hover:text-blue-800 text-lg block">
                    التقيمات
                  </Link>
                </li>
                <li className="border-b pb-3">
                  <Link to="/pricing" className="text-blue-600 hover:text-blue-800 text-lg block">
                    الدفع
                  </Link>
                </li>
                <li className="pb-3">
                  <details className="group">
                    <summary className="flex justify-between items-center text-blue-600 hover:text-blue-800 cursor-pointer text-lg">
                      المساعدة
                      <svg className="w-4 h-4 transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="mt-2 mr-4 space-y-3">

                      <a
                        href="tel:00966555475591"
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" px-8 py-2 text-blue-600 hover:bg-gray-100 text-[20px]"
                      >
                        اتصل بنا
                      </a>

                      <Link to="/" className="block text-blue-600 text-[14px] hover:text-blue-800">عن رابطة</Link>
                      <Link to="/" className="block text-blue-600 text-[14px] hover:text-blue-800">الخصوصية</Link>
                      <Link to="/" className="block text-blue-600 text-[14px] hover:text-blue-800">الشروط والاحكام</Link>
                    </div>
                  </details>
                </li>

                <li>
                  <Link to="/musdarai" className="block text-blue-600 font-bold text-[18px] hover:text-blue-800">
                    Musdar.ai
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sidebar Footer */}
            <div className="absolute bottom-0 left-0 w-full border-t p-4 mb-6">

              {User ? (
                <button
                  disabled={isPending}
                  className="  bg-red-600 hover:bg-red-700 disabled:bg-red-400 cursor-pointer text-white py-2 px-4 w-full rounded-md transition-colors duration-200" onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}>
                  تسجيل خروج
                </button>
              ) : (
                <button className="   bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-2 px-4 w-full rounded-md transition-colors duration-200" onClick={() => navigate("/login")}>
                  تسجيل دخول
                </button>
              )}
            </div>
          </div>

          {/* Overlay */}
          {isOpen && (
            <div
              role="button"
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            />
          )}

          <Search className="text-blue-600 cursor-pointer" size={25} onClick={() => setSearchopen(!searchopen)} />
          {
            searchopen && (
              <div className="absolute top-10 right-0  p-4 w-full h-full mt-3  z-50">
                <XCircle className="text-white cursor-pointer flex justify-end" size={25} onClick={() => setSearchopen(!searchopen)} />
                <div className="flex flex-col items-center mb-4 bg-white shadow-lg rounded-lg p-4">

                  <input
                    type="text"
                    placeholder="ابحث هنا..."
                    className="w-full p-2 border-b-2 border-gray-300 text-lg font-semibold rounded-md focus:outline-none placeholder:text-sm placeholder:font-bold"
                  />

                </div>
              </div>
            )
          }
          {User ? (
            <button
              disabled={isPending}
              className=" hidden lg:block bg-red-600 hover:bg-red-700 disabled:bg-red-400 cursor-pointer text-white py-2 px-4 w-full rounded-md transition-colors duration-200" onClick={() => {
                logout()
                setIsOpen(false)
              }}>
              تسجيل خروج
            </button>
          ) : (
            <button className="hidden lg:block bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-2 px-4 w-full rounded-md transition-colors duration-200" onClick={() => navigate("/login")}>
              تسجيل دخول
            </button>
          )}
          <Menu
            className="lg:hidden text-blue-600 cursor-pointer menu-button"
            size={30}
            onClick={() => setIsOpen(true)}
          />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
