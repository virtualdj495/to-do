export interface Objective {
  userId: string;
  id: number;
  name: string;
  task: string;
  endDate: string;
  state: boolean;
  email: string;
};

export interface User {
  id: string;
  username: string;
  password: string;

}
