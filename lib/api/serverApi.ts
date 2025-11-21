import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note, NoteListResponse } from '@/types/note';


export const checkServerSession = async () => {
  const cookieStore = await cookies();
  try {
    const res = await nextServer.get('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    
    return res;
  } catch (error) {
    
    return { 
      data: { success: false },
      headers: {}
    } as any;
  }
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  try {
    const res = await nextServer.get('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return res.data;
  } catch (error: any) {
    console.error('Failed to fetch user:', error.response?.data);
    throw error;
  }
};

export const fetchServerNotes = async (params?: {
  search?: string;
  page?: number;
  tag?: string;
}): Promise<NoteListResponse> => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/notes', {
    params: { ...params, perPage: 12 },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const res = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};