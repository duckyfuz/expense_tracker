import { createContext, useState } from "react";

export const MonthContext = createContext();

export const MonthProvider = ({ children }) => {
  const [month, setMonth] = useState(
    (Number(new Date().getMonth()) + 1).toString().padStart(2, "0")
  );
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <MonthContext.Provider value={{ month, setMonth, year, setYear }}>
      {children}
    </MonthContext.Provider>
  );
};
