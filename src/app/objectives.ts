export interface Objective {
  userId: number;
  id: number;
  name: string;
  task: string;
  endDate: string;
  state: boolean;
  email: string;
};

export interface User {
  id: number;
  username: string;
  password: string;

}
