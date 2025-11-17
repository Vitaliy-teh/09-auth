import css from "./ErrorMessage.module.css";
export const ErrorMessage = ({ message }: { message: string }) => (
  <div className={css.error}>{message}</div>
);
