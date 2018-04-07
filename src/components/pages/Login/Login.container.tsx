import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {Button, Icon as NBIcon, Text, View} from 'native-base';

import {
  mapDispatchToProps,
  MapDispatchToProps,
  mapStateToProps,
  MapStateToProps,
} from './Login.selectors';
import {style} from './Login.style';

export type LoginProps = MapDispatchToProps & MapStateToProps;

class LoginComponent extends React.Component<LoginProps> {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={style.content}>
          <Text style={style.header}>Welcome Stranger!</Text>
          <View style={style.avatar}>
            <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)" />
          </View>
          <Text style={style.text}>Please log in to continue</Text>
          <Button iconLeft danger onPress={this.props.actions.signIn}>
            <NBIcon name="logo-google" />
            <Text>Log in with Google!</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export const UnconnectedLogin = LoginComponent;
