const setAuthToken = (value) => {
  const stringifyAuthToken = JSON.stringify(value);
  localStorage.setItem("token", stringifyAuthToken);
};

const getAuthToken = () => {
  const stringifyAuthToken = localStorage.getItem("token");
  return stringifyAuthToken !== "undefined"
    ? JSON.parse(stringifyAuthToken)
    : null;
};

export { setAuthToken, getAuthToken };
