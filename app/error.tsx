"use client";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <p>Something went wrong. {error.message}</p>;
}
