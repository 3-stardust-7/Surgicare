import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Halyard from "../../assets/Halyard.png";
import Card1 from "../../assets/Sinapi.png";
import Card2 from "../../assets/BL Lifsciences.png";
import Card3 from "../../assets/BL Lifsciences.png";
import DepNav from "../../Components/DepNav";

const departments = [
  { id: "critical-care", name: "Critical Care" },
  { id: "cardiac-surgery", name: "Cardiac Surgery" },
  { id: "cardiology", name: "Cardiology" },
  { id: "neurosurgery", name: "Neurosurgery" },
  { id: "ophthalmology", name: "Ophthalmology" },
  { id: "pulmonology", name: "Pulmonology" },
  { id: "general-surgery", name: "General Surgery" },
  { id: "plastic-surgery", name: "Plastic Surgery" },
  { id: "orthopedic", name: "Orthopedic" },
  { id: "anesthesiology", name: "Anesthesiology" },
];

export default function Pulmonology() {

  return (
    <>
      <Navbar />

      {/* Pulmonology Page Content */}
      <div className="mt-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 p-12 items-center">
          <h2 className="text-6xl font-bold text-left flex-1">ORTHOPEDIC</h2>
        </div>

        {/* Company Details */}
        <div className="flex flex-col items-center mt-6">
          <img src={Halyard} alt="Halyard" className="h-40 w-auto" />
          <p className="mt-4 ml-4 text-left">
            Halyard contributes to the orthopedic department by providing
            high-quality surgical drapes, gowns, and sterilization solutions to
            ensure infection prevention during procedures. Their
            orthopedic-specific solutions help maintain a sterile field and
            enhance patient safety.
          </p>
        </div>

        {/* Product Range Section */}
        <div className="flex mt-10 text-4xl font-bold justify-center items-center">
          Range of Products
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 my-20 gap-6 p-10">
          {[Card1, Card2, Card3].map((image, index) => (
            <div
              key={index}
              className="relative group h-40 w-full sm:w-1/2 bg-gray-200 rounded-xl overflow-hidden shadow-lg mx-auto"
            >
              <img
                src={image}
                alt={`Card ${index + 1}`}
                className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-blue-500 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                Card {index + 1} Description
              </div>
            </div>
          ))}
        </div>

        {/* Read More Button */}
        <a
          href="https://www.halyardhealth.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center"
        >
          <button className="hover:bg-blue-300 hover:text-black text-blue-700 py-2 px-8 mb-14 rounded-3xl border font-bold hover:border-black border-blue-700">
            Read More
          </button>
        </a>
      </div>
      <DepNav/>
      <Footer />
    </>
  );
}
