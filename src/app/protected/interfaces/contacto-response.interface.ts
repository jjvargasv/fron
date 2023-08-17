import { Contacto } from "./contacto.interface";

export interface contactoResponse {
  msg: string;
  ok: boolean;
  path?: string;
  contacto: Array<Contacto>;
}
