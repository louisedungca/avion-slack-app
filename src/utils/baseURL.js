export const baseUrl = 'http://206.189.91.54';

// User Registration
export const signupUrl = `${baseUrl}/api/v1/auth/`;

// Login
export const loginUrl = `${baseUrl}/api/v1/auth/sign_in`;

// Send Message
export const sendMsgUrl = `${baseUrl}/api/v1/messages`;

// Retrieve Message
export const getMsgUrl = `${baseUrl}/api/v1/messages?receiver_id=1&receiver_class=User`;


// Create Channel with members
export const createChannelUrl = `${baseUrl}/api/v1/channels`;

// Get all users channels
export const channelUsersUrl = `${baseUrl}/api/v1/channels`;

// Get channel details via channel ID
export const channelDetailUrl = `${baseUrl}/api/v1/channels/3`;


// Add member to a channel
export const addMemberUrl = `${baseUrl}/api/v1/channel/add_member`;

// List of All Users
export const allUsersUrl = `${baseUrl}/api/v1/users`;