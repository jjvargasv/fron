
import { Resenas } from "./resenas.interface";

export interface resenasResponse {
  msg: string;
  ok: boolean;
  path?: string;
  resenas: Array<Resenas>;
}
