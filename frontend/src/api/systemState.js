import { useState } from "react";

const [state, setState] = useState(null);

export const fetchSystemState = async () => {
  const response = await fetch("/api/system/state");
  const json = await response.json();

  if (response.ok) {
    setState(json);
  }
};
