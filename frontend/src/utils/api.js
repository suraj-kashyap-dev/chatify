export const host = import.meta.env.VITE_HOST_URL;
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const usersRoute = `${host}/api/auth/users`;
export const sendMessageRoute = `${host}/api/messages/add-message`;
export const recieveMessageRoute = `${host}/api/messages/get-messages`;
