// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useQuery, keepPreviousData } from "@tanstack/react-query";
// import { useDebouncedCallback } from "use-debounce";
// import NoteList from "@/components/NoteList/NoteList";
// import { SearchBox } from "@/components/SearchBox/SearchBox";
// import { Pagination } from "@/components/Pagination/Pagination";
// import { fetchNotes } from "@/lib/api/clientApi";
// import type { Tag } from "@/types/note";
// import css from "./page.module.css";

// interface NotesClientProps {
//   tag: Tag | "all";
// }

// export default function NotesClient({ tag }: NotesClientProps) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchText, setSearchText] = useState("");

//   const { data } = useQuery({
//     queryKey: ["notes", { searchText, currentPage, tag }],
//     queryFn: () =>
//       fetchNotes({
//         searchText,
//         page: currentPage,
//         tag: tag === "all" ? undefined : tag,
//       }),
//     placeholderData: keepPreviousData,
//     refetchOnMount: false,
//   });

//   const changeSearchQuery = useDebouncedCallback((newQuery: string) => {
//     setCurrentPage(1);
//     setSearchText(newQuery);
//   }, 300);

//   const totalPages = data?.totalPages ?? 0;
//   const notes = data?.notes ?? [];

//   return (
//     <div className={css.app}>
//       <main>
//         <section>
//           <header className={css.toolbar}>
//             <SearchBox value={searchText} onSearch={changeSearchQuery} />

//             {totalPages > 1 && (
//               <Pagination
//                 totalPages={totalPages}
//                 currentPage={currentPage}
//                 onPageChange={({ selected }) => setCurrentPage(selected + 1)}
//               />
//             )}

//             <Link href="/notes/action/create" className={css.button}>
//               Create note +
//             </Link>
//           </header>

//           {notes.length > 0 && <NoteList notes={notes} />}
//         </section>
//       </main>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { Pagination } from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api/clientApi";
import type { Tag } from "@/types/note";
import css from "./page.module.css";

interface NotesClientProps {
  tag: Tag | "all";
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", { search: searchText, page: currentPage, tag }],
    queryFn: () =>
      fetchNotes({
        search: searchText,
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

  // Розрахунок пагінації
  const total = data?.total ?? 0;
  const perPage = data?.perPage ?? 12;
  const totalPages = Math.ceil(total / perPage);
  const notes = data?.notes ?? [];

  if (error) {
    return (
      <div className={css.app}>
        <main>
          <section>
            <div className={css.error}>
              Failed to load notes: {(error as any).message}
            </div>
          </section>
        </main>
      </div>
    );
  }

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

          {isLoading ? (
            <div className={css.loading}>Loading notes...</div>
          ) : notes.length > 0 ? (
            <NoteList notes={notes} />
          ) : (
            <div className={css.empty}>
              No notes found.{" "}
              {searchText
                ? "Try a different search."
                : "Create your first note!"}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
