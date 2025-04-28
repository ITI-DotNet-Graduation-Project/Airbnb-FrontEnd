export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  role: string;
}
