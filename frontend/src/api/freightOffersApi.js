import { get, post, put, remove } from "./apiClient";
import { API_ROUTES } from "../constants/apiRoutes";

export function getFreightOffers() {
  return get(API_ROUTES.FREIGHT_OFFERS);
}

export function createFreightOffer(data) {
  return post(API_ROUTES.FREIGHT_OFFERS, data);
}

export function updateFreightOffer(id, data) {
  return put(`${API_ROUTES.FREIGHT_OFFERS}/${id}`, data);
}

export function deleteFreightOffer(id) {
  return remove(`${API_ROUTES.FREIGHT_OFFERS}/${id}`);
}
