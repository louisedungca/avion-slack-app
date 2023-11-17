import { redirect } from "react-router-dom";
import { getLocalStorage } from "../utils";

// for signup and login page
export async function isLoggedInLoader() {
  const headers = getLocalStorage('Headers') || [];
  const token = headers && headers['access-token'];
    if(token) {
      return redirect("/c");
  }
  return null;
};

// to access dashboard pages
export async function accessDashLoader() {
  const headers = getLocalStorage('Headers') || [];
  const token = headers && headers['access-token'];
    if(!token) {
      return redirect("/login");
  }
  return null;
};