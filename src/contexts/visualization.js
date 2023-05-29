import { createContext, useContext, useRef, useState } from "react";

export const VisualizationContext = createContext();
export const useVisualization = () => useContext(VisualizationContext);

const VisualizationProvider = ({ children }) => {
  const [visualization, set] = useState({
    character: useRef(),
  });

  const setVisualization = (value) => set({ ...visualization, ...value });

  return (
    <VisualizationContext.Provider
      value={{ ...visualization, setVisualization }}
    >
      {children}
    </VisualizationContext.Provider>
  );
};

export default VisualizationProvider;
