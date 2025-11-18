import axios from 'axios';
import { Tag } from '@/types/note';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

export type ApiError = {
  error: string;
};

export interface NewNoteData {
  title: string;
  content: string;
  tag: Tag;
}