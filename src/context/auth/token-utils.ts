
// Mock JWT token storage functions
export const storeToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

// Mock JWT creation (in a real app, this would be done server-side)
export const createMockJwt = (user: any) => {
  // Remove password from token payload
  const { password, ...userWithoutPassword } = user;
  return JSON.stringify(userWithoutPassword);
};
