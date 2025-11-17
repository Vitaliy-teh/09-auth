import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Tag } from "@/types/note";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] ?? "all";

  return {
    title: `Notes: ${filter} | NoteHub`,
    description: `Viewing notes filtered by ${filter}.`,
    openGraph: {
      title: `Notes: ${filter} | NoteHub`,
      description: `Viewing notes filtered by ${filter}.`,
      url: `https://08-zustand-ruddy-theta.vercel.app/notes/filter/${filter}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes within the category ${filter}`,
        },
      ],
      type: "article",
    },
  };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const rawTag = slug[0];

  const validTags: Tag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  const tag: Tag | "all" = validTags.includes(rawTag as Tag)
    ? (rawTag as Tag)
    : "all";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { searchQuery: "", currentPage: 1, tag }],
    queryFn: () => fetchNotes({ tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
