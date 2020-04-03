import React from "react";
import HeaderBar from "../primitives/HeaderBar";
import NavItem from "../primitives/NavItem";

export default function CollectionHeaderBar() {
  return (
    <HeaderBar
      style={{ alignItems: "flex-end !important", padding: 5, fontSize: 18 }}
    >
      <React.Fragment>
        <NavItem url="/collections/fish" exact>
          Fish
        </NavItem>
        <NavItem url="/collections/bugs" exact>
          Bugs
        </NavItem>
        <NavItem url="/collections/fossils">Fossils</NavItem>
        <NavItem url="/collections/diy">DIY Recipes</NavItem>
      </React.Fragment>
    </HeaderBar>
  );
}
