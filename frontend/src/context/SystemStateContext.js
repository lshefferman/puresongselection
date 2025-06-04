import { createContext, useReducer, useEffect } from "react";
import { fetchSystemState } from "../api/systemState";

export const SystemStateContext = createContext();

const systemStateReducer = (state, action) => {
  switch (action.type) {
    case "SET_SYSTEM_STATE":
      return {
        ...state,
        systemState: action.payload,
      };
    case "SET_STAGE":
      return {
        ...state,
        systemState: {
          ...state.systemState,
          stage: action.payload,
        },
      };
    default:
      return state;
  }
};

export const SystemStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(systemStateReducer, {
    systemState: null,
  });

  useEffect(() => {
    const loadSystemState = async () => {
      try {
        const data = await fetchSystemState();
        dispatch({ type: "SET_SYSTEM_STATE", payload: data });
      } catch (err) {
        console.error("Failed to fetch system state:", err);
      }
    };
    loadSystemState();
  }, []);

  return (
    <SystemStateContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SystemStateContext.Provider>
  );
};
