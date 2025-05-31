const setAuthToken = (value) => {
  const stringifyAuthToken = JSON.stringify(value);
  sessionStorage.setItem("token", stringifyAuthToken);
};

const getAuthToken = () => {
  const stringifyAuthToken = sessionStorage.getItem("token");
  return stringifyAuthToken !== "undefined"
    ? JSON.parse(stringifyAuthToken)
    : null;
};

export { setAuthToken, getAuthToken };
