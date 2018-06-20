import React from "react";
import LOGO from "../assets/ce_logo.gif";
import {Menu} from "semantic-ui-react";
import MainMenu from "./Menu";

const Footer = props => (
  <div id="footer" className="ui stackable two column grid">
    <div className="column">
      <MainMenu/>
      <p className="copyright-txt">Copyright © 2016-2017 Computer Exchange. All rights reserved.</p>
    </div>
    <div className="column">
      <ul className="social-link">
        <li><span>Follow us on :</span></li>
        <li><a href=""><i class="facebook big icon"></i></a></li>
        <li><a href=""><i class="twitter square big icon"></i></a></li>
        <li><a href=""><i class="linkedin square big icon"></i></a></li>
      </ul>
      
    </div>
  </div>
);

export default Footer;