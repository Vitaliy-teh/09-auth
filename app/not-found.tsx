import { Metadata } from "next";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Page does not exist",
  openGraph: {
    title: "NoteHub",
    description: "Page does not exist",
    url: `https://08-zustand-ruddy-theta.vercel.app/`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Not Found",
      },
    ],
    type: "article",
  },
};

export default function NotFound() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
