"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { Pagination } from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api";
import type { Tag } from "@/types/note";
import css from "./page.module.css";

interface NotesClientProps {
  tag: Tag | "all";
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data } = useQuery({
    queryKey: ["notes", { searchText, currentPage, tag }],
    queryFn: () =>
      fetchNotes({
        searchText,
        page: currentPage,
        tag: tag === "all" ? undefined : tag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const changeSearchQuery = useDebouncedCallback((newQuery: string) => {
    setCurrentPage(1);
    setSearchText(newQuery);
  }, 300);

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <main>
        <section>
          <header className={css.toolbar}>
            <SearchBox value={searchText} onSearch={changeSearchQuery} />

            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              />
            )}

            <Link href="/notes/action/create" className={css.button}>
              Create note +
            </Link>
          </header>

          {notes.length > 0 && <NoteList notes={notes} />}
        </section>
      </main>
    </div>
  );
}
