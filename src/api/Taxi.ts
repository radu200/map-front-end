import { api } from "./Config";
import { taxiApiParams } from "../types";

export async function getTaxisLocation(params: taxiApiParams) {
  const url = "/api/taxi";
  return await api.get(url, params);
}
