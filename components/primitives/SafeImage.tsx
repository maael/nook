import { createRef, HTMLProps } from "react";

export default function SafeImage({
  setWidthOnError = true,
  ...props
}: HTMLProps<HTMLImageElement> & { setWidthOnError?: boolean }) {
  const imgRef = createRef<HTMLImageElement>();
  return (
    <img
      {...(props as any)}
      ref={imgRef}
      onError={() => {
        if (imgRef.current) {
          imgRef.current.src = "/images/missing.png";
          if (setWidthOnError) imgRef.current.style.width = "75px";
        }
      }}
    />
  );
}
