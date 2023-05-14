import PocketBase from "pocketbase";

interface RequestOptions {}

export const getRequest = async (url: string, options?: RequestOptions) => {
  const { API_BASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!API_BASE_URL || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Could not find env vars.");
  }
  const pb = new PocketBase(API_BASE_URL);

  const authData = await pb.admins.authWithPassword(
    ADMIN_EMAIL,
    ADMIN_PASSWORD
  );
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authData.token}`);

  const res = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  const data = await res.json();
  return data;
};

export const postRequest = async (
  url: string,
  payload: any,
  options?: RequestOptions
) => {
  const { API_BASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!API_BASE_URL || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Could not find env vars.");
  }
  const pb = new PocketBase(API_BASE_URL);

  const authData = await pb.admins.authWithPassword(
    ADMIN_EMAIL,
    ADMIN_PASSWORD
  );
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authData.token}`);
  headers.append("Content-Type", "application/json");

  const res = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};
