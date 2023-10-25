import classes from "./SuccessMessage.module.css";

interface Props {
  children: React.ReactNode;
}

export const SuccessMessage = ({ children }: Props) => {
  return <div className={classes.container}>{children}</div>;
};
