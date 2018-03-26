import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false});
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      };
    });
  };

  render() {
    return (
      <Fragment>
        <SideDrawer
          closed={this.sideDrawerCloseHandler}
          open={this.state.showSideDrawer}
          isAuth={this.props.isAuth}
        />
        <Toolbar
          drawToggleClicked={this.sideDrawerToggleHandler}
          isAuth={this.props.isAuth}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({isAuth: state.auth.token !== null});

export default connect(mapStateToProps)(Layout);
