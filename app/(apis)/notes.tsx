import PocketBase from "pocketbase";
import "dotenv/config";

export interface Note {
  id?: string;
  content: string;
  title: string;
  created?: string;
  updated?: string;
  collectionId?: string;
  collectionName?: string;
}

export async function getNotes() {
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

  const params = new URLSearchParams();
  params.append("page", "1");
  params.append("perPage", "30");

  const res = await fetch(
    `${API_BASE_URL}/api/collections/notes/records?${params.toString()}`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const data = await res.json();
  return data?.items as Note[];
}
