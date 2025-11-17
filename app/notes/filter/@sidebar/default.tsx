import React from "react";
import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { Tag } from "@/types/note";

const TAGS: Tag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}>
            All notes
          </Link>
        </li>
        {TAGS.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${encodeURIComponent(tag)}`}
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
