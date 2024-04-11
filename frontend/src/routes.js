export const users = {
  login: () => '/api/v1/login',
  signup: () => '/api/v1/signup',
};

export const channels = {
  getAll: () => '/api/v1/channels',
  post: () => '/api/v1/channels',
  patch: (channelId) => `/api/v1/channels/${channelId}`,
  delete: (channelId) => `/api/v1/channels/${channelId}`,
};

export const messages = {
  getAll: () => '/api/v1/messages',
  post: () => '/api/v1/messages',
  patch: (messageId) => `/api/v1/messages/${messageId}`,
  delete: (messageId) => `/api/v1/messages/${messageId}`,
};
