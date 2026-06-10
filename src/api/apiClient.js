const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function get(endpoint) {
  return request(endpoint);
}

export function post(endpoint, data) {
  return request(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function put(endpoint, data) {
  return request(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function remove(endpoint) {
  return request(endpoint, { method: "DELETE" });
}
