import { User } from "./user.interface";


export interface AuthResponse {
  ok: boolean;
  path?: string;
  msg?: string;
  token?: string;
  user?: User;
}
