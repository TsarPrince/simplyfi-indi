"use client";

import { useState } from "react";
import { Editor as NovelEditor } from "novel";

export default function Editor() {
  const [saveStatus, setSaveStatus] = useState("Saved");

  return (
    <div className="relative w-full max-w-screen-lg">
      <div className="absolute right-5 top-5 z-10 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {saveStatus}
      </div>
      <NovelEditor
        className="relative min-h-[320px] w-full max-w-screen-lg bg-white rounded-3xl borde shadow-l"
        defaultValue={[
          {
            type: "heading",
            attrs: {
              level: 2,
            },
            content: [
              {
                type: "text",
                text: "This is a ",
              },
              {
                type: "text",
                marks: [
                  {
                    type: "link",
                    attrs: {
                      href: "https://en.wikipedia.org/wiki/WYSIWYG",
                      target: "_blank",
                      rel: "noopener noreferrer nofollow",
                      class:
                        "novel-text-stone-400 novel-underline novel-underline-offset-[3px] hover:novel-text-stone-600 novel-transition-colors novel-cursor-pointer",
                    },
                  },
                ],
                text: "WYSIWIG",
              },
              {
                type: "text",
                text: " editor",
              },
            ],
          },
          {
            type: "horizontalRule",
          },
          {
            type: "heading",
            attrs: {
              level: 3,
            },
            content: [
              {
                type: "text",
                text: "Features",
              },
            ],
          },
          {
            type: "orderedList",
            attrs: {
              tight: true,
              start: 1,
            },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Slash menu (type ",
                      },
                      {
                        type: "text",
                        marks: [
                          {
                            type: "code",
                          },
                        ],
                        text: "/",
                      },
                      {
                        type: "text",
                        text: " ) & bubble menu (select any text to open)",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "AI autocomplete (type ",
                      },
                      {
                        type: "text",
                        marks: [
                          {
                            type: "code",
                          },
                        ],
                        text: "++",
                      },
                      {
                        type: "text",
                        text: " to activate, or select from slash menu)",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Image uploads (drag & drop / copy & paste, or select from slash menu)",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ]}
        onUpdate={() => {
          setSaveStatus("Unsaved");
        }}
        onDebouncedUpdate={() => {
          setSaveStatus("Saving...");
          // Simulate a delay in saving.
          setTimeout(() => {
            setSaveStatus("Saved");
          }, 500);
        }}
      />
    </div>
  );
}
