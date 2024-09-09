import React from 'react';
import {View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import EventButton from '../components/EventButton';
import events from '../data/eventData';
import Footer from '../components/Footer';

const EventListScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        ListHeaderComponent={
          <View style={{backgroundColor: '#FFFFFF'}}>
            <Header />
            <SubHeader
              label="EVENTS"
              backArrow={() => navigation.navigate('Home')}
            />
          </View>
        }
        stickyHeaderIndices={[0]}
        bounces={false}
        style={{backgroundColor: '#FFFFFF'}}
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <EventButton
            key={item.location}
            city={item.city}
            state={item.state}
            id={index}
          />
        )}
        contentContainerStyle={{flexGrow: 1}}
        ListFooterComponentStyle={{flex: 1, justifyContent: 'flex-end'}}
        ListFooterComponent={<Footer />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    backgroundColor: '#1b191a',
  },
});

export default EventListScreen;
