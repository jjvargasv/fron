import { User } from "./user.interface";


export interface AuthResponse {
  _id: string;
  ok: boolean;
  path?: string;
  msg?: string;
  token?: string;
  user?: User;
}
