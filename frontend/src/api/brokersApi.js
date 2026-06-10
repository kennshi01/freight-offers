import { get, post, put, remove } from "./apiClient";
import { API_ROUTES } from "../constants/apiRoutes";

export function getBrokers() {
  return get(API_ROUTES.BROKERS);
}

export function createBroker(data) {
  return post(API_ROUTES.BROKERS, data);
}

export function updateBroker(id, data) {
  return put(`${API_ROUTES.BROKERS}/${id}`, data);
}

export function deleteBroker(id) {
  return remove(`${API_ROUTES.BROKERS}/${id}`);
}
