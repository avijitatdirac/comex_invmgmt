import React from "react";
import { elastic as Menu } from "react-burger-menu";
export default class SideMenu extends React.Component {


componentDidMount(){
     
     

}
render(){

  

  return (
    <div className="customNavMenu">
      <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
        <a id="home" className="menu-item" href="/">
          <i class="tachometer alternate icon"></i> Dashboard
        </a>
        <a id="insertCustomer" className="menu-item" href="/insertCustomer">
         <i class="user plus icon"></i> Add Customer
        </a>
        <a id="manageCustomer" className="menu-item" href="/manageCustomer">
         <i class="users icon"></i> Manage Customer
        </a>
        <a id="addAsset" className="menu-item" href="/addAsset">
         <i class="edit icon"></i> Add to Inventory
        </a>
        <a id="displayAssets" className="menu-item" href="/displayAssets" >
          <i class="file alternate outline icon"></i> Order Asset
        </a>
        <a id="contact" className="menu-item" href="/editAssetType">
          <i class="edit outline icon"></i> Edit Asset Types
        </a>
        <a id="returnAssets" className="menu-item" href="/returnAssets">
          <i class="cubes icon"></i> Manage Inventory
        </a>
        <a id="challanDraft" className="menu-item" href="/challanDraft">
          <i class="copy outline icon"></i>Saved Challan Drafts
        </a>
        <a id="settings" className="menu-item" href="/settings">
          <i class="cogs icon"></i>  Settings
        </a>
        <a id="home" className="menu-item" href="/login">
          <i class="sign in alternate icon"></i> Logout
        </a>
      </Menu>
    </div>
  );
}  

}