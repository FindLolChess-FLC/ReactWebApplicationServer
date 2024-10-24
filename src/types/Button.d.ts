export type ButtonProps = {
  width?: string;
  height?: string;
  bgcolor?: string;
  type: "submit" | "button";
  id: string;
  name?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: any;
};
