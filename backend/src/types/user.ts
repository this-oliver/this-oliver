interface IUser {
  name: string;
  email: string;
  password: string;
  salt: string;
  visits: number;
  bio: {
    short: string;
    long: string;
  };
}

export { IUser };