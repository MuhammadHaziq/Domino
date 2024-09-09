import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import Image from 'react-native-scalable-image';

const TermsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flexGrow: 1}}
        stickyHeaderIndices={[0]}
        bounces={false}>
        <View>
          <Header />
          <SubHeader
            backArrow={() => navigation.goBack()}
            label="DOMINO TERMS"
          />
        </View>
        <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <View style={styles.container}>
            <Text style={styles.description}>
              <Text style={styles.label}>BLOCK GAME: </Text>
              When no Player can play, yet no Player has Domino.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>DOMINO: </Text>
              Means a Player have played all Tiles in their hand.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>DOMINO COUNT: </Text>
              The number of Points in the Opponents hand (rounded to the nearest
              Five), that the Winner gets when played the last Tile.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>DOWN: </Text>
              The first Tile played on the Table.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>THE DOWNER: </Text>
              The first Player to play on the Table.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>GAME: </Text>
              300 Points (Six Houses).
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>THE HAND TILES: </Text>
              Refers to the (7) or (9) Tiles in a Player’s hand.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>HOUSE: </Text>
              Fifty Points (50).
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>PASS / KNOCK: </Text>
              Means a Player, Can’t Play.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>SHUFFLE / WASH: </Text>
              Mixing Face Down (28) or (55) Tiles on the Table.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>DOUBLE TILE: </Text>
              Single Tile with Matching numbers of Dots on both ends.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>SPLIT TILE: </Text>
              Single Tile with Different numbers of Dots on both ends.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>SPINNER TILE: </Text>
              First Double played on the Table.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>TILES SUIT: </Text>
              Refers to the Tiles that have the same numbers of Dots on the
              ends. There are (7) or (9) Tiles in a suit.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>TABLE COUNT: </Text>
              The total number of Dots in multiples of Five, starting at Ten.
              Counting the exposed ends only. Ex. 10 – 15 – 20 – 25 – 30, etc…
            </Text>
            <Text style={{...styles.description, marginTop: 35}}>
              <Text style={styles.label}>1. OBJECT OF THE GAME: </Text>
              To score as many Points as possible in multiples of Five starting
              at Ten, to reach 300 Points (Six Houses).
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>2. SCORING: </Text>
              Is done when the total Dots on the exposed end Tiles adds up to
              multiples of Five starting at Ten. Ex. 10 – 15 – 20 – 25 – 30,
              etc…
            </Text>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: '100%',
    paddingHorizontal: 8,
    marginTop: 20,
  },
  label: {
    fontFamily: 'TitilliumWeb-SemiBold',
    textDecorationLine: 'underline',
  },
  description: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TermsScreen;
