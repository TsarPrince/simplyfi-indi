"use client";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineStrikethrough,
} from "react-icons/ai";
import { BiUndo, BiRedo, BiCode } from "react-icons/bi";
import { RiFormatClear } from "react-icons/ri";
import { MdHorizontalRule, MdFormatListBulleted } from "react-icons/md";
import { BiSolidQuoteAltLeft, BiLinkAlt } from "react-icons/bi";
import { BsTextParagraph } from "react-icons/bs";
import {
  PiTextHOneBold,
  PiTextHTwoBold,
  PiTextHThreeBold,
  PiTextHFourBold,
  PiTextHFiveBold,
  PiTextHSixBold,
  PiListNumbersFill,
} from "react-icons/pi";
import { MdOutlineKeyboardCommandKey } from "react-icons/md";
import { useCallback } from "react";
import Underline from "@tiptap/extension-underline";

const MenuBar = () => {
  const { editor } = useCurrentEditor({});

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const removeLink = useCallback(() => {
    editor.chain().focus().unsetLink().run();
  }, [editor]);

  if (!editor) {
    return;
  }

  return (
    <div className="tiptap-buttons divide-x divide-gray/20 my-2 space-x-2">
      <div className="inline">
        <button
          title="Bold (Ctrl+B)"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <AiOutlineBold />
        </button>
        <button
          title="Italic (Ctrl+I)"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <AiOutlineItalic />
        </button>
        <button
          title="Underline (Ctrl+U)"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <AiOutlineUnderline />
        </button>
        <button
          title="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <AiOutlineStrikethrough />
        </button>
        <button
          title="Clear Formatting"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <RiFormatClear />
        </button>
        {/* <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button> */}
      </div>
      <div className="inline pl-2">
        <button
          title="Normal text (Ctrl+Alt+0)"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          <BsTextParagraph />
        </button>
        <button
          title="Level 1 Heading (Ctrl+Alt+1)"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          <PiTextHOneBold />
        </button>
        <button
          title="Level 2 Heading (Ctrl+Alt+2)"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          <PiTextHTwoBold />
        </button>
        <button
          title="Level 3 Heading (Ctrl+Alt+3)"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          <PiTextHThreeBold />
        </button>
        <button
          title="Level 4 Heading (Ctrl+Alt+4)"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          <PiTextHFourBold />
        </button>
        <button
          title="Level 5 Heading (Ctrl+Alt+5)"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          <PiTextHFiveBold />
        </button>
        <button
          title="Level 6 Heading (Ctrl+Alt+6)"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          <PiTextHSixBold />
        </button>
      </div>
      <div className="inline pl-2">
        <button
          title="Number list (1. or Ctrl+Shift+7)"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <PiListNumbersFill />
        </button>
        <button
          title="Bullet list (- or Ctrl+Shift+8)"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <MdFormatListBulleted />
        </button>
        <button
          title="Keyboard (Ctrl+E)"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          <MdOutlineKeyboardCommandKey />
        </button>
        <button
          title="Code Block (```)"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <BiCode />
        </button>
        <button
          title="Link (Ctrl+K)"
          onClick={editor.isActive("link") ? removeLink : setLink}
          className={editor.isActive("link") ? "is-active" : ""}
        >
          <BiLinkAlt />
        </button>
        <button
          title="Quote (>)"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <BiSolidQuoteAltLeft />
        </button>
        <button
          title="Horizontal Rule (---)"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <MdHorizontalRule />
        </button>
        {/* <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button> */}
      </div>
      <div className="inline pl-2">
        <button
          title="Undo (Ctrl+Z)"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <BiUndo />
        </button>
        <button
          title="Redo (Ctrl+Y)"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <BiRedo />
        </button>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  Link.configure({
    protocols: ["ftp", "mailto"],
    openOnClick: true,
  }),
  Underline,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const content = `
<h1>Heading Level 1</h1>
<h2>Heading Level 2</h2>
<h3>Heading Level 3</h3>
<h4>Heading Level 4</h4>
<h5>Heading Level 5</h5>
<h6>Heading Level 6</h6>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

const TipTapEditor = () => {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
    ></EditorProvider>
  );
};

export default TipTapEditor;
