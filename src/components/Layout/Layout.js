import React, { Component, Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: true
  }
  
  sideDrawerCloseHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  }

  render() {
    return (
      <Fragment>
        <SideDrawer 
          closed={this.sideDrawerCloseHandler} 
          open={this.state.showSideDrawer}
        />
        <Toolbar />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

export default Layout;
