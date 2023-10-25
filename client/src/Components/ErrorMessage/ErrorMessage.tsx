import classes from "./ErrorMessage.module.css";

interface Props {
  children: React.ReactNode;
}

export const ErrorMessage = ({ children }: Props) => {
  return <div className={classes.container}>{children}</div>;
};
