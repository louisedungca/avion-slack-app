import { redirect } from "react-router-dom";
import { getLocalStorage } from "../utils";

// for signup and login page
export function isLoggedInLoader() {
  const headers = getLocalStorage('Headers') || [];
  const token = headers && headers['access-token'];
  const client = headers && headers['client'];
  const expiry = headers && headers['expiry'];
  const uid = headers && headers['uid'];
    if(token) {
      return redirect("/c/channels");
  }
  return { headers, token, client, expiry, uid };
};

// to access dashboard pages
export function accessDashLoader() {
  const headers = getLocalStorage('Headers') || [];
  const token = headers && headers['access-token'];
  const client = headers && headers['client'];
  const expiry = headers && headers['expiry'];
  const uid = headers && headers['uid'];
    if(!token) {
      return redirect("/login");
  }
  return { headers, token, client, expiry, uid };
};