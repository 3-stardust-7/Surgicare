import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/Surgicare logo.png";
import { motion, AnimatePresence } from "framer-motion";
import Searchbar from "./Searchbar"
import { useLocation } from 'react-router-dom';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isDisposablesOpen, setIsDisposablesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarRef = useRef(null);
  const desktopDropdownRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';


const departments = [
  { name: "Anesthesiology and Critical Care", href: "/anesthesiology&CriticalCare" },
  { name: "Cardiac Surgery and Perfusion", href: "/cardiac-surgery" },
  { name: "Cardiology", href: "/cardiology" },
  { name: "General Surgery", href: "/general-surgery" },
  { name: "Nephrology", href: "/nephrology" },
  { name: "Neurosurgery", href: "/neurosurgery" },
  { name: "Ophthalmology", href: "/ophthalmology" },
  { name: "Orthopedic", href: "/orthopedic" },
  { name: "Plastic Surgery", href: "/plastic-surgery" },
  { name: "Pulmonology", href: "/pulmonology" },
];


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100 && !isProductsOpen && !isDisposablesOpen) {
        setIsVisible(false);
        setIsMenuOpen(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isProductsOpen, isDisposablesOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // For desktop view - check if click is outside the dropdown
      if (window.innerWidth >= 1024) {
        if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
          setIsProductsOpen(false);
          setIsDisposablesOpen(false);
        }
      } else {
        // For mobile view - check if click is outside the entire navbar
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
          setIsMenuOpen(false);
          setIsProductsOpen(false);
          setIsDisposablesOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleProductsMenu = () => setIsProductsOpen(!isProductsOpen);
  const toggleDisposablesMenu = () => setIsDisposablesOpen(!isDisposablesOpen);

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };
 
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (<>
    <motion.nav 
      ref={navbarRef}
      className="fixed top-0 w-full z-30"
      initial={false}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ 
        duration: 0.3, 
        ease: "easeInOut" 
      }}
    >
      {!isScrolled && (
        <div className="absolute inset-0 z-[-2] bg-white transition-opacity duration-300" />
      )}

      <motion.div
        initial={false}
        animate={{
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255,255,255,0)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`absolute inset-0 z-[-1] transition-all duration-500 ${
          isScrolled ? 'shadow-xl border-b border-gray-200/50' : ''
        }`}
      />

      <div className=" md:max-w-full px-4 sm:px-6 mx-auto lg:px-8 2xl:px-60">
        <div className="flex lg:flex-col 2xl:flex-row justify-between items-center h-16 sm:h-20 mb-0 lg:mb-4 2xl:mb-0">
          {/* Logo Section */}
                    <div className="flex items-center space-x-3">
                      <div className=" transition-colors duration-200 relative group  rounded-xl flex items-center justify-center">
                        <img src={logo} alt="SurgiCare Logo" className="mb-2 sm:mb-0 w-14 h-10 sm:w-20 sm:h-12" />
                      </div>
                      <div>
                        <h1 className="text-gray-800 hover:text-blue-900 font-sans font-semibold text-2xl sm:text-3xl 2xl:text-4xl transition-colors duration-200 relative group">
                          Nandana Surgi Care
                        </h1>
                      </div>
                    </div>
          
          {/* Hamburger Icon */}
          <div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-700 relative hover:text-green-600 focus:outline-none transition-colors duration-200"
            >
              {isMenuOpen ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-8  items-center">
            <a
              href="/"
              className="text-gray-700 hover:text-green-600 font-semibold text-lg 2xl:text-xl transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="/about-us"
              className="text-gray-700 hover:text-green-600 font-semibold text-lg 2xl:text-xl transition-colors duration-200 relative group"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
            </a>

            {/* Products Dropdown */}
            <div className="relative" ref={desktopDropdownRef}>
              <button
                onClick={toggleProductsMenu}
                className="text-gray-700 hover:text-green-600 font-semibold text-lg 2xl:text-xl transition-colors duration-200 relative group flex items-center space-x-1"
              >
                <span>Products</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
              </button>

              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div 
                   className="absolute -left-32 mt-4 w-96 bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href="/products"
                      className="block px-6 py-3 text-green-600 hover:shadow-lg hover:text-green-900 font-sans text-xl hover:bg-green-50 transition-colors duration-200"
                    >
                      Equipments
                    </a>
                    <div>
                      <button
                        onClick={toggleDisposablesMenu}
                        className="w-full text-left px-6 py-3 text-green-600 hover:shadow-lg hover:text-green-900 font-sans text-xl hover:bg-green-50 transition-colors duration-200 flex items-center justify-between"
                      >
                        <span>Disposables</span>
                        <svg className={`w-4 h-4 transition-transform duration-200 ${isDisposablesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {isDisposablesOpen && (
                          <motion.div 
                            className="border-t border-gray-200/50 bg-gray-50/50"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                          >
                            <div className="grid grid-cols-2 gap-2 p-4">
                              {departments.map((dept) => (
                                <a
                                  key={dept.name}
                                  href={dept.href}
                                  className="text-gray-700 hover:text-green-700 hover:bg-white px-3 py-2 rounded-lg transition-all duration-200 text-xl font-sans border border-transparent hover:border-green-200"
                                >
                                  {dept.name} Products
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
             <a
                       href="/certificates"
                        className="text-gray-700 hover:text-green-600 font-semibold text-lg 2xl:text-xl transition-colors duration-200 relative group"
                       style={{ WebkitTapHighlightColor: 'transparent' }}
                     >
                       Certificates
                     </a>

            <a
              href="/contact"
              className="text-gray-700 hover:text-green-600 font-semibold text-lg 2xl:text-xl transition-colors duration-200 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
            </a>
{isHomePage && (
  <div className="hidden lg:block">
    <Searchbar 
      items={departments} 
      onSelect={(item) => {
        console.log('Selected:', item);
      }}
    />
  </div>
)}

          </div>
        

        </div>

        {/* Mobile Menu */}
   <AnimatePresence>
       {isMenuOpen && (
         <div className="absolute inset-0 lg:hidden z-40 ">
           <motion.div 
             className="max-h-screen  rounded rounded-b-2xl  overflow-y-auto bg-white shadow-2xl px-4 pt-4 "
             variants={menuVariants}
             initial="hidden"
             animate="visible"
             exit="exit"
             transition={{ duration: 0.3 }}
           >
                  <div className="flex items-center space-x-3">
                 <div className=" transition-colors duration-200 relative group  rounded-xl flex items-center justify-center">
                   <img src={logo} alt="SurgiCare Logo" className="mb-2 sm:mb-0 w-14 h-10 sm:w-20 sm:h-12" />
                 </div>
                 <div>
                   <h1 className="text-gray-800 hover:text-blue-900 font-sans font-semibold text-2xl sm:text-4xl transition-colors duration-200 relative group">
                     Nandana Surgi Care
                   </h1>
                 </div>
               </div>
     
                   <div className="px-2  space-y-2 mb-4">
                     <a
                       href="/"
                       className="block text-gray-700 rounded rounded-xl hover:text-green-700 font-bold text-lg p-3 transition duration-200 hover:shadow-lg"
                       style={{ WebkitTapHighlightColor: 'transparent' }}
                     >
                       Home
                     </a>
                     <a
                       href="/about-us"
                       className="block text-gray-700 rounded rounded-xl hover:text-green-700 font-bold text-lg p-3 transition duration-200 hover:shadow-lg"
                       style={{ WebkitTapHighlightColor: 'transparent' }}
                     >
                       About Us
                     </a>
     
                     {/* Products Dropdown */}
                     <div>
<div className="group w-full">
  <button
    onClick={toggleProductsMenu}
    className="w-full text-left text-gray-700 rounded-xl font-semibold text-lg p-3 transition-colors duration-200 flex items-center justify-between group-hover:text-green-600 group-hover:shadow-lg focus:outline-none"
    style={{ WebkitTapHighlightColor: 'transparent' }}
  >
    <span>Products</span>
    <svg className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
</div>
                       <AnimatePresence>
                         {isProductsOpen && (
                           <motion.div 
                             className="ml-4 mt-1 space-y-2 "
                             variants={dropdownVariants}
                             initial="hidden"
                             animate="visible"
                             exit="exit"
                             transition={{ duration: 0.2 }}
                           >
                             <a
                               href="/products"
                               className="block rounded rounded-xl text-lg bg-green-50 text-green-600 font-sans p-2  hover:bg-green-100 hover:text-green-800 hover:shadow-lg transition-colors duration-200"
                               style={{ WebkitTapHighlightColor: 'transparent' }}
                             >
                               Equipments
                             </a>
                             <div>
                               <button
                                 onClick={toggleDisposablesMenu}
                                 className="w-full text-lg  text-left text-green-600 font-sans bg-green-50 rounded rounded-xl p-2 hover:text-green-800 hover:shadow-lg hover:bg-green-100 transition-colors duration-200 flex items-center justify-between"
                                 style={{ WebkitTapHighlightColor: 'transparent' }}
                               >
                                 <span>Disposables</span>
                                 <svg className={`w-4 h-4 transition-transform duration-200 ${isDisposablesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                 </svg>
                               </button>
                               <AnimatePresence>
                                 {isDisposablesOpen && (
                                   <motion.div 
                                     className="ml-4 mt-2 grid grid-cols-1 gap-2"
                                     variants={dropdownVariants}
                                     initial="hidden"
                                     animate="visible"
                                     exit="exit"
                                     transition={{ duration: 0.2 }}
                                   >
                                     {departments.map((dept) => (
                                       <a
                                         key={dept.name}
                                         href={dept.href}
                                         className="text-gray-600 pl-4 rounded hover:text-green-900 hover:bg-green-100 font-sans text-lg transition-colors duration-200 flex items-center space-x-2"
                                       >
                                         <span className="text-3xl text-green-700">•</span>
                                         <span>{dept.name } Products</span>
                                       </a>
                                     ))}
                                   </motion.div>
                                 )}
                               </AnimatePresence>
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </div>
          <a
                       href="/certificates"
                       className="block text-gray-700 rounded rounded-xl hover:text-green-700 font-bold text-lg p-3 transition duration-200 hover:shadow-lg"
                       style={{ WebkitTapHighlightColor: 'transparent' }}
                     >
                       Certificates
                     </a>
                       <a
                         href="/contact"
                         className="block text-gray-700 rounded-xl hover:text-green-700 font-bold text-lg p-3 transition duration-200 hover:shadow-lg"
                         style={{ WebkitTapHighlightColor: 'transparent' }}
                       >
                         Contact
                       </a>

                   </div>
                   
                 </motion.div>
                    </div>
                      )}           
                      
     </AnimatePresence>
      </div>
    </motion.nav>
    </>
  );
};

export default Navbar;