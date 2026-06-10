import { get, post, put, remove } from "./apiClient";
import { API_ROUTES } from "../constants/apiRoutes";

export function getFreightOffers(filters = {}) {
  const query = new URLSearchParams(
    Object.entries(filters).filter(([, value]) => value),
  ).toString();

  const endpoint = query ? `${API_ROUTES.FREIGHT_OFFERS}?${query}` : API_ROUTES.FREIGHT_OFFERS;
  return get(endpoint);
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
