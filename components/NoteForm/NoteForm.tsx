"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote, type NewNoteData } from "@/lib/api";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { Tag } from "@/types/note";
import css from "./NoteForm.module.css";

const tags: Tag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: createdNote => {
      queryClient.setQueryData(
        ["notes", { searchQuery: "", currentPage: 1, tag: "all" }],
        (oldData: any) => {
          if (!oldData) return { notes: [createdNote], totalPages: 1 };
          return {
            ...oldData,
            notes: [createdNote, ...oldData.notes],
          };
        },
      );

      clearDraft();

      queryClient.invalidateQueries({
        queryKey: ["notes"],
        refetchType: "all",
      });

      router.push("/notes/filter/all");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as Record<string, string>;
    const newNote: NewNoteData = {
      title: values.title,
      content: values.content,
      tag: values.tag as Tag,
      // categoryId: values.categoryId,
    };
    mutate(newNote);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label className={css.label}>
          Title
          <input
            type="text"
            name="title"
            required
            className={css.input}
            value={draft.title}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>
          Content
          <textarea
            name="content"
            required
            className={css.textarea}
            value={draft.content}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>
          Tag
          <select
            name="tag"
            required
            className={css.select}
            value={draft.tag}
            onChange={handleChange}
          >
            <option value="">Select tag</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.push("/notes/filter/all")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
