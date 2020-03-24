import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';
import moment from 'moment';

export class ForecastInterval extends Component {
  state = {
    isFocus: false,
  };

  cardText = text => {
    return (
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        ellipsizeMode="clip"
        style={styles.cardText}
      >
        {text}
      </Text>
    );
  };

  formatTime = timeStamp => {
    const millisFromNow = timeStamp - moment();

    return moment()
      .add(millisFromNow, 'milliseconds')
      .calendar();
  };

  onFocus = () => this.setState({ isFocus: true });

  onBlur = () => this.setState({ isFocus: false });

  renderForecastItemByType = data => ({
    temps: this.cardText(`${data.temp && data.temp.toFixed()}˚C`),
    conditions: this.cardText(`${data.description}`),
    clouds: this.cardText(`Clouds: ${data.all}%`),
    humidity: this.cardText(`Humidity: ${data}%`),
    wind: this.cardText(`Wind: ${data.speed && data.speed.toFixed()}km/h`),
  });

  renderForecastItem = ({ item }) => (
    <View
      style={[styles.listItem, this.state.isFocus && styles.listItemFocus]}
      onFocus={this.onFocus}
      onBlur={this.onBlur}
    >
      {this.renderForecastItemByType(item.data)[item.type]}
    </View>
  );

  // TODO: Add focus to the first item in the list

  render() {
    const { timeStamp, data } = this.props;

    return (
      <View style={styles.list}>
        <Text style={styles.dateText}>{this.formatTime(timeStamp)}</Text>

        <FlatList
          data={data}
          renderItem={this.renderForecastItem}
          keyExtractor={item => item.type}
          horizontal={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: FormFactor.isTV ? 300 : 180,
    height: FormFactor.isTV ? 150 : 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: FormFactor.isTV ? '#009038' : '#249EFF',
  },
  listItemFocus: {
    backgroundColor: '#3DDC84',
  },
  list: {
    backgroundColor: '#EBEBEB',
    marginBottom: FormFactor.isTV ? 30 : 10,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: FormFactor.isTV ? 45 : 20,
    alignSelf: 'center',
  },
  cardText: {
    fontSize: FormFactor.isTV ? 35 : 24,
    color: '#FFFFFF',
  },
});
