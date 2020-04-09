import React from "react";
import HeaderBar from "../primitives/HeaderBar";
import NavItem from "../primitives/NavItem";

export default function CollectionHeaderBar() {
  return (
    <HeaderBar
      style={{
        alignItems: "flex-end !important",
        padding: "2px 5px 5px 5px",
        fontSize: 16,
        height: "auto"
      }}
    >
      <React.Fragment>
        <NavItem url="/events/bunny" exact>
          Bunny Day
        </NavItem>
      </React.Fragment>
    </HeaderBar>
  );
}
