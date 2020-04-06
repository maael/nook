/** @jsx jsx */
import { jsx } from "@emotion/core";
import { createRef, useState, useEffect } from "react";
import { colors } from "../../util/theme";

export default function NewCustomDesign() {
  const fileInputRef = createRef<HTMLInputElement>();
  const [file, setFile] = useState<File | undefined>();
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState("");
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
  return (
    <div
      css={{
        backgroundColor: colors.blueDark,
        padding: 5,
        borderRadius: "0.3em",
        display: "inline-block"
      }}
    >
      <div css={{ display: "flex", flexDirection: "column" }}>
        New Custom Design
        <div
          css={{
            border: `1px dashed ${colors.blueLight}`,
            padding: 5,
            margin: 5,
            cursor: "pointer"
          }}
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
        >
          {file ? (
            preview ? (
              <img
                src={preview}
                style={{
                  maxWidth: 600,
                  maxHeight: 100
                }}
              />
            ) : (
              "Uploading"
            )
          ) : (
            "Upload Image"
          )}
        </div>
        <input
          onChange={e => setFile((e.target.files || [])[0])}
          ref={fileInputRef}
          style={{ display: "none" }}
          type="file"
        />
        <div>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Code"
          />
          <input
            value={type}
            onChange={e => setType(e.target.value)}
            placeholder="Type"
          />
        </div>
        <button
          css={{ flex: 1 }}
          onClick={() => {
            console.info(file, title, code, type);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
