import styled from "styled-components";
import { TooltipForm } from "../../types/Tooltip";

const TooltipBox = styled.div<TooltipForm>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  padding: 8px 12px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.89);
  color: #fff;
  font-size: 11px;
  line-height: 159.714%; /* 17.569px */
  z-index: 6;
  white-space: pre-wrap;
  h3 {
    font-size: 12px;
    font-weight: 800;
  }
`;

export default function Tooltip({
  width,
  height,
  top,
  left,
  children,
}: TooltipForm) {
  return (
    <TooltipBox width={width} height={height} top={top} left={left}>
      {children}
    </TooltipBox>
  );
}
