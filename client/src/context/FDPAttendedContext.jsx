import { createContext, useState } from "react";

export const FDPAttendedContext = createContext();

export const FDPAttendedProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    venue: "",
    toc: "",
    resourcePersons: [],
    geoTagPhotos: [],
    attendance: [],
    feedback: "",
    brochure: null,
  });

  return (
    <FDPAttendedContext.Provider value={{ formData, setFormData }}>
      {children}
    </FDPAttendedContext.Provider>
  );
};

