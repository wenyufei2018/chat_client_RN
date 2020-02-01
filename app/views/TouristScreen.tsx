/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {navigatorsContext} from '../index';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks'

interface ITouristScreen {
  navigation: NavigationScreenProp<{}>;
}

const TouristScreen: React.FC<ITouristScreen> = () => {
  const {setNavigator} = useContext(navigatorsContext);
  const query_allUsers = gql(`
    query{
      users{
        name
      }
    }
`);
  
  const {loading, error, data} = useQuery(query_allUsers);
  if(!loading) console.log(data);
  if(!!error) console.log(error);
  
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>游客页面</Text>
      <Button
        title="转到用户页面"
        onPress={() => setNavigator('UserNavigator')}
      />
      <Button
        title="测试 apollo"
        onPress={() => {
          console.log("data");
          // client.query({query:query_allUsers})
          //   .then(data => console.log(data))
          //   .catch(error => console.error(error));
        }}
      />
    </View>
  );
};

export default TouristScreen;
