export const authMiddleware = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  return token ? true : false;
};
