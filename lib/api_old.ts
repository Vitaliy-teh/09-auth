import axios from "axios";
import type { Note, Tag } from "@/types/note";

const API_BASE = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  searchText?: string;
  tag?: Tag | "all";
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  searchText,
  tag,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const params: Record<string, unknown> = { page, perPage };
  if (searchText) params.search = searchText;
  if (tag && tag !== "all") params.tag = tag;

  const { data } = await api.get<FetchNotesResponse>("/notes", { params });

  const notes = data.notes.map((n: any) => ({ ...n, id: n.id ?? n._id }));
  return { ...data, notes };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);

  return { ...data, id: (data as any).id ?? (data as any)._id };
};

export interface Category {
  id: string;
  name: string;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: Tag;
}

export const createNote = async (note: NewNoteData): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);

  return { ...data, id: (data as any).id ?? (data as any)._id };
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
