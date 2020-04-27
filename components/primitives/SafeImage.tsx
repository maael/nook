import { createRef, HTMLProps } from "react";

export default function SafeImage(props: HTMLProps<HTMLImageElement>) {
  const imgRef = createRef<HTMLImageElement>();
  return (
    <img
      {...(props as any)}
      ref={imgRef}
      onError={() => {
        if (imgRef.current) {
          imgRef.current.src = "/images/missing.png";
          imgRef.current.style.width = "75px";
        }
      }}
    />
  );
}
