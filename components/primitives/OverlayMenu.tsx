import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { colors } from "../../util/theme";
import NavItem from "./NavItem";

export default function OverlayMenu({ onClose }: { onClose: () => void }) {
  const [first, setFirst] = useState<boolean>();
  const router = useRouter();
  useEffect(() => {
    if (first) {
      onClose();
    } else {
      setFirst(true);
    }
  }, [router.pathname]);
  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: colors.blueDark,
        zIndex: 99,
        paddingTop: 25
      }}
    >
      <div
        onClick={() => onClose()}
        style={{ position: "absolute", top: 10, left: 5 }}
      >
        <IoIosCloseCircleOutline color={colors.blueLight} size={50} />
      </div>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "100%"
        }}
        url="/"
        exact
      >
        Home
      </NavItem>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "100%"
        }}
        url="/collections"
      >
        Collections
      </NavItem>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "90vw",
          marginLeft: "10vw"
        }}
        url="/collections/bugs"
      >
        Bugs
      </NavItem>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "90vw",
          marginLeft: "10vw"
        }}
        url="/collections/fish"
      >
        Fish
      </NavItem>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "90vw",
          marginLeft: "10vw"
        }}
        url="/collections/fossils"
      >
        Fossils
      </NavItem>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "90vw",
          marginLeft: "10vw"
        }}
        url="/collections/diy"
      >
        DIY Recipes
      </NavItem>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "100%"
        }}
        url="/custom-designs"
      >
        Custom Designs
      </NavItem>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "100%"
        }}
        url="/events"
      >
        Events
      </NavItem>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "100%"
        }}
        url="/checklist"
      >
        Checklist
      </NavItem>
      <NavItem
        style={{
          padding: "20px 10px 10px 10px",
          display: "block",
          width: "100%"
        }}
        url="/users"
      >
        Users
      </NavItem>
    </div>
  );
}
