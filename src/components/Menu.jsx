import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {history} from '../_helpers'
export default class MainMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {this.setState({ activeItem: name })
     history.push(name) 
}

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item
          name='insertCustomer'
          active={activeItem === 'insertCustomer'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='manageCustomer'
          active={activeItem === 'manageCustomer'}
          onClick={this.handleItemClick}
        />
         <Menu.Item
          name='addAsset'
          active={activeItem === 'addAsset'}
          onClick={this.handleItemClick}
        />
         <Menu.Item
          name='displayAssets'
          active={activeItem === 'displayAssets'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='contact'
          active={activeItem === 'contact'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}
