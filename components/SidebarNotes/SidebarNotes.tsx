"use client";

import Link from "next/link";
import css from "./SidebarNotes.module.css";

const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export default function SidebarNotes() {
  return (
    <aside className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes" className={css.menuLink}>
          All notes
        </Link>
      </li>
      {TAGS.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </aside>
  );
}
