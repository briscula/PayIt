import * as React from 'react';
import {Alert, Platform, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {Body, Button, List, ListItem, Text, Thumbnail} from 'native-base';
import {colors} from 'style';
import {getFormattedMoney} from 'utils';

import {Loading} from 'components/common';

import {
  mapDispatchToProps,
  MapDispatchToProps,
  MapStateToProps,
  mapStateToProps,
} from './Bills.selectors';
import {EmptyBills} from './components/';
import {I18n} from './i18n';

const imagesMap = {
  default: require('assets/img/default-bill-image.png'),
};

// const priorityBarColors: {[index: number]: string} = {
//   1: colors.info,
//   2: colors.danger,
//   3: colors.warning,
// };

type Props = MapStateToProps & MapDispatchToProps;

class BillsComponent extends React.Component<Props> {
  deleteBill = (billId: string) => {
    Alert.alert(I18n.t('global.confirmDialog.title'), I18n.t('global.confirmDialog.msg'), [
      {text: I18n.t('global.confirmDialog.cancel'), style: 'cancel'},
      {
        text: I18n.t('global.confirmDialog.confirm'),
        onPress: () => this.props.actions.deleteBill(billId),
      },
    ]);
  };

  render() {
    if (this.props.bills === null) return <Loading />;

    const billsArray = Object.values(this.props.bills);

    if (billsArray.length === 0) return <EmptyBills />;

    return (
      <List>
        <ScrollView alwaysBounceVertical={false}>
          {billsArray.map((bill, index) => (
            <ListItem key={index} onPress={() => this.props.actions.editBill(bill.id)}>
              <Thumbnail square size={80} source={imagesMap.default} />
              <Body>
                <Text>{bill.description}</Text>
                <Text note>{`${I18n.t('bills.expirationDayLabel')}: ${bill.expirationDay}`}</Text>
                <Text note>{`${I18n.t('bills.valueLabel')}: ${getFormattedMoney(
                  bill.value,
                )}`}</Text>
              </Body>
              <Button
                style={{alignSelf: 'center'}}
                transparent
                rounded
                onPress={() => this.deleteBill(bill.id)}
              >
                <Icon
                  name={Platform.select({
                    ios: 'ios-remove-circle-outline',
                    android: 'md-remove-circle',
                  })}
                  size={32}
                  color={colors.danger}
                  style={{color: colors.danger}}
                />
              </Button>
              {/* <View
                style={[style.priorityBar, {backgroundColor: priorityBarColors[bill.priority]}]}
              /> */}
            </ListItem>
          ))}
        </ScrollView>
      </List>
    );
  }
}
export const Bills = connect(mapStateToProps, mapDispatchToProps)(BillsComponent);
