import React, { useState } from "react";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
// import { Link } from "react-router-dom";


function AccordingList({ item }) {
  const [isOpen, setIsOpen] = useState(null);
  const toggleAccordion = (i) => {
    if (isOpen === i) {
      setIsOpen(null);
    } else {
      setIsOpen(i);
    }
  };
  return (

    <li key={item.id} className=" flex flex-col gap-4 w-full">
      <div
        className={`flex justify-between items-center w-full bg-white p-4 rounded-lg cursor-pointer ${isOpen === item.id ? "transition-all duration-300 ease-in-out shadow-lg" : ""}`}
        onClick={() => toggleAccordion(item.id)}
      >
        <h3 className="text-lg font-semibold text-blue-600">{item.question}</h3>
        {isOpen === item.id ? (
          <HiMiniChevronUp size={24} />
        ) : (
          <HiMiniChevronDown size={24} />
        )}
      </div>
      {isOpen === item.id && (
        <div className="p-4  rounded-lg">
          <p className=" text-lg  font-semibold">{item.answer}</p>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              تحميل التطبيق
            </a>
          )}
        </div>
      )}
    </li>

  );



}

export default AccordingList;
