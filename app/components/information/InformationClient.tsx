"use client";

import React, { useEffect } from "react";
import { Editor as NovelEditor } from "novel";
import { Json } from "@/types/database.types";
import Button from "../Button";

const InformationClient = ({ content }: { content: Json }) => {
  useEffect(() => {
    // cannot find a better way to scroll to top
    // as Novel doesn't exposes the editor ref
    const interval = setInterval(() => {
      const proseMirrorContainer = document.querySelector(
        ".custom-class-for-zero-padding"
      ) as HTMLElement;
      if (proseMirrorContainer) {
        proseMirrorContainer.scrollTo(0, 0);
        clearInterval(interval);
      }
    }, 100);
  }, []);

  return (
    <div className="h-full pt-12">
      <NovelEditor
        className="custom-class-for-zero-padding relative h-[calc(100%-2rem)] overflow-y-scroll w-full bg-lightGray"
        defaultValue={JSON.parse(JSON.stringify(content))}
        editorProps={{
          editable: () => false,
        }}
        disableLocalStorage
      />
    </div>
  );
};

export default InformationClient;
