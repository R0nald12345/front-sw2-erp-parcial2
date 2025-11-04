export interface Usuario {
  username: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  usuario: Usuario;
  accessToken: string;
}

export interface GraphQLLoginResponse {
  data: {
    login: LoginResponse;
  };
}

export interface LoginPayload {
  username: string;
  password: string;
  ip: string;
}