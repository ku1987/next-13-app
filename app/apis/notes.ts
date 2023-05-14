import "dotenv/config";
import { getRequest, postRequest } from "./api";

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
  const { API_BASE_URL } = process.env;
  if (!API_BASE_URL) {
    throw new Error("Could not find env vars.");
  }

  const params = new URLSearchParams();
  params.append("page", "1");
  params.append("perPage", "30");

  const url = `${API_BASE_URL}/api/collections/notes/records?${params.toString()}`;
  const data = await getRequest(url);
  return data?.items as Note[];
}

export async function getNoteById(id: string) {
  const { API_BASE_URL } = process.env;
  if (!API_BASE_URL) {
    throw new Error("Could not find env vars.");
  }

  const url = `${API_BASE_URL}/api/collections/notes/records/${id}`;
  const data = await getRequest(url);
  return data as Note;
}

export async function addNote(title: string, content: string) {
  const { API_BASE_URL } = process.env;
  if (!API_BASE_URL) {
    throw new Error("Could not find env vars.");
  }

  const url = `${API_BASE_URL}/api/collections/notes/records`;
  const data = await postRequest(url, { title, content });
  return data as Note;
}
