export default interface ILogin {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface ISuccess {
  type: boolean;
  message: string;
}

export interface IError {
  token: string;
}
