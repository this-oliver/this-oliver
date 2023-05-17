interface IUser {
  name: string;
  email: string;
  password: string;
  salt: string;
  
  status: string;
  visits: number;
}

export { IUser };