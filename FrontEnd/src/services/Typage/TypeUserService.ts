export interface SignInResponse {
  token: string;
}

export interface UserInfo {
  pseudo: string;
  email: string;
  password: string;
  profileActive: boolean;
}

// Interface pour le service UserService
export interface UserService {
  login: (pseudo: string, password: string) => Promise<void>;
  signIn: (userInfos: UserInfo) => Promise<SignInResponse>;
}
