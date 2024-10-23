export type ButtonProps = {
  type: "submit" | "button";
  button: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: any;
};
