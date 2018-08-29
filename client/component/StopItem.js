import React from 'react';
import { TouchableHighlight, Text } from 'react-native';

class StopItem extends React.Component {
  render() {
    const { stop, sortHandlers } = this.props;
    
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          padding: 25,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        {...sortHandlers}
      >
        <Text>{stop.name}</Text>
      </TouchableHighlight>
    )
  }
}

export default StopItem;
