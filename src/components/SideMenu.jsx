import React from "react";
import { elastic as Menu } from "react-burger-menu";

const SideMenu = props => (
  <div>
    <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
    <a id="home" className="menu-item" href="/login">
        Logout
      </a>
      <a id="home" className="menu-item" href="/">
        Dashboard
      </a>
      <a id="insertCustomer" className="menu-item" href="/insertCustomer">
        Add Customer
      </a>
      <a id="manageCustomer" className="menu-item" href="/manageCustomer">
        Manage Customer
      </a>
      <a id="addAsset" className="menu-item" href="/addAsset">
        Add to Inventory
      </a>
      <a id="displayAssets" className="menu-item" href="/displayAssets" >
        Order Asset
      </a>
      <a id="contact" className="menu-item" href="/editAssetType">
        Edit Asset Types
      </a>
      <a id="returnAssets" className="menu-item" href="/returnAssets">
        Manage Inventory
      </a>
      <a id="challanDraft" className="menu-item" href="/challanDraft">
      Saved Challan Drafts
      </a>
      <hr/>
      <a id="settings" className="menu-item" href="/settings">
      Settings
      </a>
    </Menu>
  </div>
);

export default SideMenu;
