import { FunctionComponent, PropsWithChildren } from "react";
import { IoMdInformationCircle, IoMdCloseCircle } from "react-icons/io";
import { colors } from "../../util/theme";

const Notification: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div
      css={{
        border: `1px solid ${colors.blueLight}`,
        backgroundColor: colors.blueDark,
        borderRadius: 5,
        margin: "5px auto",
        maxWidth: 800,
        padding: "5px 15px",
        width: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        boxSizing: "border-box"
      }}
    >
      <IoMdInformationCircle color={colors.blueLight} />
      <div css={{ flex: 1, margin: "0px 5px" }}>{children}</div>
      <IoMdCloseCircle color={colors.blueLight} title="Hide" />
    </div>
  );
};

export default Notification;
