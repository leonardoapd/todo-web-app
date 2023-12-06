// import jwtDecode from "jwt-decode";

// export const extractEmailFromToken = () => {
//   const token = localStorage.getItem("token");

//   try {
//     const decodedToken = jwtDecode(token);
//     if (decodedToken && decodedToken.sub) {
//       return decodedToken.sub;
//     } else {
//       return null; // El token no contiene un email válido
//     }
//   } catch (error) {
//     console.error("Token not valid", error);
//     return null;
//   }
// };

// export const isUserLogged = () => {
//   const token = localStorage.getItem("token");
//   return token !== null;
// };

// export const isTokenExpired = () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     const decodedToken = jwtDecode(token);
//     const expirationTime = decodedToken.exp;
//     const actualTime = Date.now() / 1000;
//     return expirationTime < actualTime;
//   } else {
//     return true;
//   }
// };

// export const isUserAdmin = () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     const decodedToken = jwtDecode(token);
//     const roles = decodedToken.roles;
//     return roles.includes("ROLE_ADMIN");
//   } else {
//     return false;
//   }
// };

// export const isUser = () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     const decodedToken = jwtDecode(token);
//     const roles = decodedToken.roles;
//     return roles.includes("ROLE_USER");
//   } else {
//     return false;
//   }
// };
