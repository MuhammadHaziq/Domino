import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import Image from 'react-native-scalable-image';

const AppendicesScreen = ({navigation}) => {
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
            label="APPENDICES I & II"
          />
        </View>
        <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <Text style={styles.title}>APPENDIX (I)</Text>
          <View style={styles.container}>
            <Text style={styles.description}>
              <Text style={styles.label}>SHUFFLE: </Text>
              Mixing "Fingers Only" 28 Tiles Face down Center of the Table.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>DOWN: </Text>
              The first Tile played by a Player on the Table.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>KNOCK: </Text>
              Means a Player can not play.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>LOCKED: </Text>
              When all Players can not play.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>SPLIT TILE: </Text>A Tile with
              Different numbers of Dots on the ends.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                width={Dimensions.get('window').width * 0.4}
                source={require('../../assets/images/appx-split1.png')}
              />
              <Image
                width={Dimensions.get('window').width * 0.4}
                source={require('../../assets/images/appx-split2.png')}
              />
            </View>
            <Text style={styles.description}>
              <Text style={styles.label}>DOUBLE TILE: </Text>A Tile with
              Matching numbers of Dots on the ends.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                width={Dimensions.get('window').width * 0.4}
                source={require('../../assets/images/appx-double1.png')}
              />
              <Image
                width={Dimensions.get('window').width * 0.4}
                source={require('../../assets/images/appx-double2.png')}
              />
            </View>
            <Text style={styles.description}>
              <Text style={styles.label}>SPINNER TILE: </Text>
              First Double Tile played on the Table.{'\n'}
              *Plays can be made on all (4) sides of the Spinner "ONLY". *First
              Played Cross Section.
            </Text>
            <Image
              style={{alignSelf: 'center'}}
              width={Dimensions.get('window').width * 0.75}
              source={require('../../assets/images/appx-spinner1.png')}
            />
            <Text style={styles.description}>*Secondly played End to End.</Text>
            <Image
              style={{alignSelf: 'center'}}
              width={Dimensions.get('window').width * 0.75}
              source={require('../../assets/images/appx-spinner2.png')}
            />
          </View>
          <Text style={styles.title}>APPENDIX (II)</Text>
          <View style={styles.container}>
            <Text style={styles.description}>
              Split tiles are played End-to-End "ONLY".
            </Text>
            <Image
              style={{alignSelf: 'center'}}
              width={Dimensions.get('window').width * 0.75}
              source={require('../../assets/images/appx-split3.png')}
            />
            <Text style={styles.description}>
              Double tiles are played Cross Split Tile "ONLY".
            </Text>
            <Image
              style={{alignSelf: 'center'}}
              width={Dimensions.get('window').width * 0.75}
              source={require('../../assets/images/appx-double3.png')}
            />
            <Text style={styles.description}>
              <Text style={styles.label}>DOMINO: </Text>
              When the first Player plays all the Tiles
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
  title: {
    marginTop: 25,
    alignSelf: 'center',
    fontFamily: 'TitilliumWeb-SemiBold',
    fontSize: 18,
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
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
    marginTop: -10,
    marginBottom: 6,
  },
});

export default AppendicesScreen;
