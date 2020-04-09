import { useState, useEffect } from "react";

export default function useImagePreview(file: File | undefined) {
  const [preview, setPreview] = useState("");
  useEffect(() => {
    const reader = new FileReader();
    function listener() {
      setPreview(reader.result ? reader.result.toString() : "");
    }
    reader.addEventListener("load", listener, false);
    if (file) reader.readAsDataURL(file);
    return () => {
      reader.removeEventListener("load", listener);
    };
  }, [file]);
  return preview;
}
