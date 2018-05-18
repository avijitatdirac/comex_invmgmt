import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import AddAsset from "./pages/AddAsset";
import AddAssetType from "./pages/AddAssetType";
import DisplayAssets from "./pages/DisplayAssets";
import RemoveAsset from "./pages/RemoveAsset";
import Dashboard from "./pages/Dashboard";
import ReturnAssets from "./pages/ReturnAssets";
import EditAssetType from "./pages/EditAssetType";
import ManageCustomer from "./pages/ManageCustomer";
import InsertCustomer from "./pages/InsertCustomer";
import AddAddress from "./pages/AddAddress"
import AssetAddition from "./pages/AssetAddition"
import UpgradeWarranty from "./pages/UpgradeWarranty"
import ChallanDraft from "./pages/ChallanDraft"

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <Header/>
        <div id="outer-container">
          <SideMenu />
          <div id="page-wrap">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact={true} component={Dashboard} />
               <Route path="/insertCustomer" exact={true} component={InsertCustomer} />
               <Route path="/addAsset" exact={true} component={AddAsset} />
               <Route path="/addAssetType" exact={true} component={AddAssetType} />
               <Route path="/displayAssets" exact={true} component={DisplayAssets} />
               <Route path="/removeAsset" exact={true} component={RemoveAsset} />
               <Route path="/returnAssets" exact={true} component={ReturnAssets} />
               <Route path="/editAssetType" exact={true} component={EditAssetType} />
               <Route path="/manageCustomer" exact={true} component={ManageCustomer} />
               <Route path="/addAddress" exact={true} component={AddAddress} />
               <Route path="/manageCustomer" exact={true} component={ManageCustomer} />
               <Route path="/assetAddition" exact={true} component={AssetAddition} />
               <Route path="/upgradeWarranty" exact={true} component={UpgradeWarranty} />
               <Route path="/challanDraft" exact={true} component={ChallanDraft} />
              </Switch>
          </BrowserRouter>
            
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
