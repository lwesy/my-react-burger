import React, { Component, Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  
  sideDrawerCloseHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  }

  sideDrawerToggleHandler = () => {
    this.setState(({ showSideDrawer }) => {
      return {
        showSideDrawer: !showSideDrawer
      }
    });
  }

  render() {
    return (
      <Fragment>
        <SideDrawer 
          closed={this.sideDrawerCloseHandler} 
          open={this.state.showSideDrawer}
        />
        <Toolbar drawToggleClicked={this.sideDrawerToggleHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

export default Layout;
