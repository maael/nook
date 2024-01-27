import React, { useState } from "react";
import Modal from "react-modal";
import { MdZoomOutMap } from "react-icons/md";
import { colors } from "../../util/theme";

Modal.setAppElement("#__next");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px 0px 5px 0px",
    borderRadius: "0.3em",
    maxWidth: "95vmin",
    textAlign: "center",
    backgroundColor: colors.blueDark,
    color: colors.blueLight,
    border: "none",
    overflow: "hidden"
  },
  overlay: {
    backgroundColor: "rgba(193, 211, 253, 0.5)"
  }
} as const;

export default function CustomDesignImageModal({
  style,
  customDesign
}: {
  style?: any;
  customDesign: any;
}) {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
      <div style={style} onClick={() => setIsOpen(true)}>
        <MdZoomOutMap size={25} style={{ marginBottom: -2 }} />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img src={customDesign.s3Url} style={{ maxWidth: "100%" }} />
        <div onClick={() => setIsOpen(false)} style={{ cursor: "pointer" }}>
          Close
        </div>
      </Modal>
    </>
  );
}
