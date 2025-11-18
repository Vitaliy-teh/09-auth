import { nextServer, ApiError } from './api';
import { User } from '@/types/user';
import { Note, NoteListResponse } from '@/types/note';

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  username?: string;
  avatar?: string;
}

// Auth functions
export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  const res = await nextServer.get<{ success: boolean }>('/auth/session');
  return res.data.success;
};

// export const getMe = async (): Promise<User> => {
//   const res = await nextServer.get<User>('/auth/me');
//   return res.data;
// };

// export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
//   const res = await nextServer.patch<User>('/auth/me', data);
//   return res.data;
// };

export const getMe = async (): Promise<User> => {
  const res = await nextServer.get<User>('/users/me'); // ЗМІНА: /auth/me -> /users/me
  return res.data;
};

export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
  const res = await nextServer.patch<User>('/users/me', data); // ЗМІНА: /auth/me -> /users/me
  return res.data;
};

// Notes functions
export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  tag?: string;
}): Promise<NoteListResponse> => {
  const res = await nextServer.get<NoteListResponse>('/notes', { params });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};



export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const res = await nextServer.post<Note>('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};