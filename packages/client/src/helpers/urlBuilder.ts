const urlBuilder = (endpoint: string): string => {
  if (endpoint.startsWith('/')) endpoint = endpoint.slice(1);

  return `${import.meta.env.VITE_SERVER_URL}/${endpoint}`;
};

export default urlBuilder;
