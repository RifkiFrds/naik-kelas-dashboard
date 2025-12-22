import React from "react";
import { useEffect, useRef } from "react";

const TrixEditor = ({ initialValue = "", onChange }) => {
  const editorRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
  if (editorRef.current && initialValue) {
    editorRef.current.innerHTML = initialValue;
  }
}, [initialValue]);


  useEffect(() => {
    const editor = editorRef.current;

    if (!editor) return;

    const handleChange = () => {
      // 🔥 INI KUNCI UTAMA
      const html = editor.innerHTML;
      onChange(html);
    };

    editor.addEventListener("trix-change", handleChange);

    return () => {
      editor.removeEventListener("trix-change", handleChange);
    };
  }, [onChange]);

  return (
    <div className="border rounded-lg">
      <input
        ref={inputRef}
        type="hidden"
        defaultValue={initialValue}
      />
      <trix-editor
        ref={editorRef}
        input={inputRef.current?.id}
        class="trix-content"
      />
    </div>
  );
};

export default TrixEditor;
