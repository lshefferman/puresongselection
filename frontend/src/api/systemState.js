export const fetchSystemState = async () => {
  const response = await fetch("/api/system/state");
  if (!response.ok) {
    throw new Error("Failed to fetch system state");
  }
  return await response.json();
};
