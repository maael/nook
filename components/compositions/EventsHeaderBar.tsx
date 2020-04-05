import React from "react";
import HeaderBar from "../primitives/HeaderBar";
import NavItem from "../primitives/NavItem";

export default function CollectionHeaderBar() {
  return (
    <HeaderBar
      style={{ alignItems: "flex-end !important", padding: 5, fontSize: 18 }}
    >
      <React.Fragment>
        <NavItem url="/events/bunny" exact>
          Bunny Day
        </NavItem>
      </React.Fragment>
    </HeaderBar>
  );
}
