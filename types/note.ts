export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: Tag;
  createdAt: string;
  updatedAt: string;
}
 
export interface NoteListResponse {
  notes: Note[];
  total: number;
  page: number;
  perPage: number;
  totalPages?: number;
}