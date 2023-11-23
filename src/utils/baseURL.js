export const baseUrl = 'http://206.189.91.54';

// User Registration - HTTP Method: POST
export const signupUrl = `${baseUrl}/api/v1/auth/`;

// Login - HTTP Method: POST
export const loginUrl = `${baseUrl}/api/v1/auth/sign_in`;

// Send Message - HTTP Method: POST
export const sendMsgUrl = `${baseUrl}/api/v1/messages`;

// Retrieve Message - HTTP Method: Get
export const getMsgUrl = (id) => `${baseUrl}/api/v1/messages?receiver_id=${id}&receiver_class=User`;

export const getChnlMsgUrl = (id) => `${baseUrl}/api/v1/messages?receiver_id=${id}&receiver_class=Channel`;

// Create Channel with members - HTTP Method: POST
export const createChannelUrl = `${baseUrl}/api/v1/channels`;

// Get all users channels - HTTP Method: Get
export const usersChannelUrl = `${baseUrl}/api/v1/channels`;

// Get channel details via channel ID - HTTP Method: Get
export const channelDetailUrl = (channelID) => `${baseUrl}/api/v1/channels/${channelID}`;

// Add member to a channel - HTTP Method: POST
export const addMemberUrl = `${baseUrl}/api/v1/channel/add_member`;

// List of All Users - HTTP Method: Get
export const allUsersUrl = `${baseUrl}/api/v1/users`;