import type { Note } from "@/types/note";
import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import { useState } from "react";
import Link from "next/dist/client/link";

interface NoteListProps {
  notes: Note[];
  onDelete?: (id: string) => void;
}

const NoteList = ({ notes, onDelete }: NoteListProps) => {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const mutation = useMutation<Note, Error, string>({
    mutationFn: deleteNote,
    onMutate: (id: string) => {
      setDeletingId(id);
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      if (onDelete) onDelete(id);
    },
    onSettled: () => {
      setDeletingId(null);
    },
    onError: (err: Error) => {
      console.error("Failed to delete note:", err);
    },
  });

  if (notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map(note => {
        const isDeleting = deletingId === note.id;
        return (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link
                className={css.details}
                href={`/notes/${note.id}`}
                onClick={() => console.log("Opening note with ID:", note.id)}
              >
                View details
              </Link>
              <button
                className={css.button}
                onClick={() => mutation.mutate(note.id)}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default NoteList;
