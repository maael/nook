/** @jsx jsx */
import { jsx } from "@emotion/core";
import { createRef, useState, useEffect } from "react";
import { colors, styles } from "../../util/theme";
import { CUSTOM_DESIGN_TYPES } from "../../util/constants";
import useCustomDesignImage from "../../components/hooks/useCustomDesignImage";
import useImagePreview from "../../components/hooks/useImagePreview";
import Select from "../../components/primitives/SimpleSelect";
import CreatableSelect from "../../components/primitives/SimpleCreatableSelect";

interface Props {
  onCreate?: (created: any) => void;
  onClose?: () => void;
  existingTags?: string[];
}

export default function NewCustomDesign({
  onCreate,
  existingTags,
  onClose
}: Props) {
  const fileInputRef = createRef<HTMLInputElement>();
  const [file, setFile] = useState<File | undefined>();
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const preview = useImagePreview(file);
  const detected = useCustomDesignImage(file);
  detected.on("start", () => {
    setDetecting(true);
  });
  detected.on("finish", () => {
    setDetecting(false);
  });
  detected.on("data", data => {
    setTitle(data.title);
    setType(data.type);
    setCode(data.code);
  });
  return (
    <div
      css={{
        backgroundColor: colors.blueDark,
        padding: 5,
        borderRadius: "0.3em",
        display: "inline-block",
        width: 600,
        maxWidth: "90vw"
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
          onChange={e =>
            e.target.files &&
            e.target.files.length &&
            setFile(e.target.files[0])
          }
          ref={fileInputRef}
          style={{ display: "none" }}
          type="file"
        />
        <div css={{ display: "flex", flexDirection: "row" }}>
          <input
            css={styles.inputLight}
            style={{ margin: 2 }}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title..."
          />
          <input
            css={styles.inputLight}
            style={{ margin: 2 }}
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Code..."
          />
        </div>
        <div css={{ display: "flex", flexDirection: "row" }}>
          <div css={{ width: "100%" }}>
            <Select
              value={type}
              placeholder="Type..."
              options={CUSTOM_DESIGN_TYPES}
              onChange={value => setType(value || "")}
            />
          </div>
          <div css={{ width: "100%" }}>
            <CreatableSelect
              value={tags}
              placeholder="Tags..."
              options={(existingTags || []).concat(tags)}
              onChange={setTags}
            />
          </div>
        </div>
        {detecting ? <div>Detecting...</div> : null}
        {error ? <div>{error}</div> : null}
        <button
          disabled={detecting || loading || !title || !code || !type || !file}
          css={styles.button}
          onClick={async () => {
            setLoading(true);
            setError("");
            const fd = new FormData();
            fd.append("img", file!);
            fd.append("title", title);
            fd.append("code", code);
            fd.append("type", type);
            fd.append("tags", JSON.stringify(tags));
            try {
              const res = await fetch("/api/db/custom-designs", {
                method: "POST",
                body: fd
              });
              if (res.ok && onCreate) {
                onCreate(await res.json());
                setFile(undefined);
                setTitle("");
                setCode("");
                setType("");
              } else if (!res.ok) {
                setError("An error occurred, please try again.");
              }
            } catch (e) {
              setError("An error occurred, please try again.");
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        {onClose ? (
          <button
            css={styles.button}
            onClick={() => {
              setFile(undefined);
              setTitle("");
              setCode("");
              setType("");
              setError("");
              setLoading(false);
              onClose();
            }}
          >
            Close
          </button>
        ) : null}
      </div>
    </div>
  );
}
