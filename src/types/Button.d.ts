export type ButtonForm = {
  width?: string;
  height?: string;
  $bgcolor?: string;
  type: "submit" | "button";
  id: string;
  name?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
};
