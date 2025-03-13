export type ButtonForm = {
  width?: string;
  height?: string;
  $bgcolor?: string;
  $font?: string;
  id: string;
  type: "submit" | "button";
  name?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
};
