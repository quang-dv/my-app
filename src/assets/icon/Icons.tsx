import AlignCenterSvg from "./align-center.svg";
import AlignJustifySvg from "./align-justify.svg";
import AlignLeftSvg from "./align-left.svg";
import AlignRightSvg from "./align-right.svg";
import BoldSvg from "./bold.svg";
import ColorFillSvg from "./color-fill.svg";
import ColorTextSvg from "./color-text.svg";
import ImageSvg from "./image.svg";
import IndentDecreaseSvg from "./indent-decrease.svg";
import IndentIncreaseSvg from "./indent-increase.svg";
import ItalicSvg from "./italic.svg";
import LinkSvg from "./link.svg";
import ListBulletedSvg from "./list-bulleted.svg";
import ListNumberedSvg from "./list-numbered.svg";
import RedoSvg from "./redo.svg";
import StrikethroughSvg from "./strikethrough.svg";
import TableSvg from "./table.svg";
import UnderlinedSvg from "./underlined.svg";
import UndoSvg from "./undo.svg";

interface IconProps {
  className?: string;
  alt?: string;
}

export const AlignCenterIcon = ({ className = "", alt = "Align Center" }: IconProps) => (
  <img src={AlignCenterSvg} className={className} alt={alt} />
);

export const AlignJustifyIcon = ({ className = "", alt = "Align Justify" }: IconProps) => (
  <img src={AlignJustifySvg} className={className} alt={alt} />
);

export const AlignLeftIcon = ({ className = "", alt = "Align Left" }: IconProps) => (
  <img src={AlignLeftSvg} className={className} alt={alt} />
);

export const AlignRightIcon = ({ className = "", alt = "Align Right" }: IconProps) => (
  <img src={AlignRightSvg} className={className} alt={alt} />
);

export const BoldIcon = ({ className = "", alt = "Bold" }: IconProps) => (
  <img src={BoldSvg} className={className} alt={alt} />
);

export const ColorFillIcon = ({ className = "", alt = "Color Fill" }: IconProps) => (
  <img src={ColorFillSvg} className={className} alt={alt} />
);

export const ColorTextIcon = ({ className = "", alt = "Color Text" }: IconProps) => (
  <img src={ColorTextSvg} className={className} alt={alt} />
);

export const ImageIcon = ({ className = "", alt = "Image" }: IconProps) => (
  <img src={ImageSvg} className={className} alt={alt} />
);

export const IndentDecreaseIcon = ({ className = "", alt = "Indent Decrease" }: IconProps) => (
  <img src={IndentDecreaseSvg} className={className} alt={alt} />
);

export const IndentIncreaseIcon = ({ className = "", alt = "Indent Increase" }: IconProps) => (
  <img src={IndentIncreaseSvg} className={className} alt={alt} />
);

export const ItalicIcon = ({ className = "", alt = "Italic" }: IconProps) => (
  <img src={ItalicSvg} className={className} alt={alt} />
);

export const LinkIcon = ({ className = "", alt = "Link" }: IconProps) => (
  <img src={LinkSvg} className={className} alt={alt} />
);

export const ListBulletedIcon = ({ className = "", alt = "List Bulleted" }: IconProps) => (
  <img src={ListBulletedSvg} className={className} alt={alt} />
);

export const ListNumberedIcon = ({ className = "", alt = "List Numbered" }: IconProps) => (
  <img src={ListNumberedSvg} className={className} alt={alt} />
);

export const RedoIcon = ({ className = "", alt = "Redo" }: IconProps) => (
  <img src={RedoSvg} className={className} alt={alt} />
);

export const StrikethroughIcon = ({ className = "", alt = "Strikethrough" }: IconProps) => (
  <img src={StrikethroughSvg} className={className} alt={alt} />
);

export const TableIcon = ({ className = "", alt = "Table" }: IconProps) => (
  <img src={TableSvg} className={className} alt={alt} />
);

export const UnderlinedIcon = ({ className = "", alt = "Underlined" }: IconProps) => (
  <img src={UnderlinedSvg} className={className} alt={alt} />
);

export const UndoIcon = ({ className = "", alt = "Undo" }: IconProps) => (
  <img src={UndoSvg} className={className} alt={alt} />
);
