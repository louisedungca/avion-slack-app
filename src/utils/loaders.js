import { redirect } from "react-router-dom";
import { getLocalStorage } from "../utils";

// for signup and login page
export function isLoggedInLoader() {
  const headers = getLocalStorage('Headers') || [];
  const token = headers && headers['access-token'];
    if(token) {
      return redirect("/c/chats");
  }
  return null;
};

// to access dashboard pages
export function accessDashLoader() {
  const headers = getLocalStorage('Headers') || [];
  const token = headers && headers['access-token'];
    if(!token) {
      return redirect("/login");
  }
  return null;
};