import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlinedIcon,
  UndoIcon,
} from "../../../assets/icon";
import { Modal } from "../../Modal";

function Divider() {
  return <div className="divider" />;
}

function getSelectedNode(selection: any) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return focus.isAtStart() ? anchorNode : focusNode;
  } else {
    return anchor.isAtStart() ? focusNode : anchorNode;
  }
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  // State mới cho chức năng link
  const [isLink, setIsLink] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Cập nhật định dạng text (bold, italic, ...)
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      // --- Logic xử lý cho link ---
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      // Kiểm tra xem node hoặc cha của nó có phải là LinkNode không
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
        const linkNode = $isLinkNode(parent) ? parent : node;
        setLinkUrl(linkNode.getURL()); // Lấy URL của link hiện tại
      } else {
        setIsLink(false);
        setLinkUrl(""); // Reset URL nếu không phải là link
      }
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateToolbar]);

  // Hàm được gọi khi nhấn nút "Link" trên toolbar
  const handleAddLink = useCallback(() => {
    if (!isLink) {
      // Nếu đang tạo link mới
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          // Lấy text đang được bôi đen làm text mặc định cho link
          setLinkText(selection.getTextContent());
        }
      });
    } else {
      // Nếu đang sửa link cũ, text sẽ được lấy từ node
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const node = getSelectedNode(selection);
          const parent = node.getParent();
          const linkNode = $isLinkNode(parent) ? parent : node;
          if (linkNode) {
            setLinkText(linkNode.getTextContent());
          }
        }
      });
    }
    setIsLinkModalOpen(true);
  }, [editor, isLink]);

  // Hàm được gọi khi submit form trong modal
  const handleLinkSubmit = useCallback(() => {
    if (linkUrl.trim() === "") {
      // Nếu URL trống, coi như là gỡ bỏ link
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    } else {
      // Sử dụng TOGGLE_LINK_COMMAND để thêm hoặc cập nhật link
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
    }

    // Đóng modal và reset state
    setIsLinkModalOpen(false);
    setLinkUrl("");
    setLinkText("");
  }, [editor, linkUrl]);

  const handleCloseModal = () => {
    setIsLinkModalOpen(false);
    setLinkUrl("");
    setLinkText("");
  };

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <UndoIcon />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <RedoIcon />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (isBold ? "active" : "")}
        aria-label="Format Bold"
      >
        <BoldIcon />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item spaced " + (isItalic ? "active" : "")}
        aria-label="Format Italics"
      >
        <ItalicIcon />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
        aria-label="Format Underline"
      >
        <UnderlinedIcon />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
        aria-label="Format Strikethrough"
      >
        <StrikethroughIcon />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className="toolbar-item spaced"
        aria-label="Left Align"
      >
        <AlignLeftIcon />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        className="toolbar-item spaced"
        aria-label="Center Align"
      >
        <AlignCenterIcon />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        className="toolbar-item spaced"
        aria-label="Right Align"
      >
        <AlignRightIcon />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className="toolbar-item"
        aria-label="Justify Align"
      >
        <AlignJustifyIcon />
      </button>
      <Divider />
      <button
        onClick={handleAddLink}
        className="toolbar-item spaced"
        aria-label="Add Link"
      >
        <LinkIcon />
      </button>
      <Modal
        isOpen={isLinkModalOpen}
        onClose={() => {
          setIsLinkModalOpen(false);
          setLinkUrl("");
          setLinkText("");
        }}
        title="Add Link"
        footer={
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <button
              onClick={() => {
                setIsLinkModalOpen(false);
                setLinkUrl("");
                setLinkText("");
              }}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleLinkSubmit}
              style={{
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add Link
            </button>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: "500",
              }}
            >
              Text:
            </label>
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Link text"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: "500",
              }}
            >
              URL:
            </label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              autoFocus
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      </Modal>{" "}
    </div>
  );
}
