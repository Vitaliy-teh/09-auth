// import { cookies } from 'next/headers';
// import { nextServer } from './api';
// import { User } from '@/types/user';
// import { Note, NoteListResponse } from '@/types/note';

// export const checkServerSession = async (): Promise<{
//     headers: any; success: boolean
// }> => {
//   const cookieStore = await cookies();
//   const res = await nextServer.get('/auth/session', {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });
//   return res.data;
// };

// export const getServerMe = async (): Promise<User> => {
//   const cookieStore = await cookies();
//   const res = await nextServer.get('/auth/me', {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });
//   return res.data;
// };

// export const fetchServerNotes = async (params?: {
//   search?: string;
//   page?: number;
//   tag?: string;
// }): Promise<NoteListResponse> => {
//   const cookieStore = await cookies();
//   const res = await nextServer.get('/notes', {
//     params,
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });
//   return res.data;
// };

// export const fetchServerNoteById = async (id: string): Promise<Note> => {
//   const cookieStore = await cookies();
//   const res = await nextServer.get(`/notes/${id}`, {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });
//   return res.data;
// };
import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note, NoteListResponse } from '@/types/note';

// Виправлений тип для checkServerSession
export const checkServerSession = async (): Promise<{
  [x: string]: any; success: boolean 
}> => {
  const cookieStore = await cookies();
  try {
    const res = await nextServer.get('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return res.data;
  } catch (error) {
    return { success: false };
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