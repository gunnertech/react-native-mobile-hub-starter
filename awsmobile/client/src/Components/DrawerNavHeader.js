import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  Avatar,
  Drawer
} from 'react-native-material-ui';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users.current
});

class DrawerNavHeader extends React.Component {
  render() {
    return(
      <Drawer.Header >
      {
        this.props.currentUser && this.props.currentUser.Username ? (
          <Drawer.Header.Account
              avatar={<Avatar text={(this.props.currentUser.Username || "").toUpperCase().substring(0,2)} />}
              footer={{
                  dense: true,
                  centerElement: {
                      primaryText: this.props.currentUser.Username,
                      secondaryText: `@${this.props.currentUser.Username}`,
                  },
              }}
          />
        ) : (<View />)
      }
      </Drawer.Header>
    )
  }
}

export default connect(
  mapStateToProps,
  {}
)(DrawerNavHeader);