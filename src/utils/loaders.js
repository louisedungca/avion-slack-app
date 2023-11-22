import { redirect } from "react-router-dom";
import { channelUsersUrl, getLocalStorage } from "../utils";

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

// for channel -- parent and children
export async function channelLoader() {
  const headers = getLocalStorage('Headers') || [];
  const token = headers && headers['access-token'];
  const client = headers && headers['client'];
  const expiry = headers && headers['expiry'];
  const uid = headers && headers['uid'];

  if (!token) {
    return redirect("/login");
  }

  try {
    const response = await fetch(channelUsersUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
          'access-token': token,
          'client': client,
          'expiry': expiry,
          'uid': uid,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch channels list.');
    }

    const result = await response.json();
    console.log('fetch channels:', result);

    return {
      channels: result.data || [],
    };
  } catch (error) {
    console.error(error);
  };
};