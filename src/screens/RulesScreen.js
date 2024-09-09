import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import Image from 'react-native-scalable-image';

const RulesScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flexGrow: 1}}
        stickyHeaderIndices={[0]}
        bounces={false}>
        <View>
          <Header />
          <SubHeader backArrow={() => navigation.goBack()} label="RULES" />
        </View>
        <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <View style={styles.container}>
            <Text style={styles.description}>
              <Text style={styles.label}>BE ON TIME: </Text>
              If over 5 Minutes late for any round of play, you WILL be
              Disqualified.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>SUBSTITUTE ANOTHER PLAYER: </Text>
              Is not permitted at any time.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>SCORING: </Text>
              Players MUST Score Ten (10) Points to Sign-on-Board. Then scoring
              will be done in multiples of (5s) starting at (10) and up (Example
              – 10, 15, 20, 25, 30, etc...)
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>COUNTING: </Text>
              All Players WILL Orally count points prior to releasing his/her
              hand from the Domino and/or before the next Player plays or pass.
              Any miss count WILL result in a (50-Point Penalty)
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>SINGLE ROUNDS: </Text>
              The game is to (300 Points, 6 Houses)
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>STYLE OF PLAY: </Text>
              Is (Cut-Throat) meaning (4) Players to each Table drawing (7)
              Domino each. (NO TEAMS), (NO ONE-ON-ONE)
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>PASSED AND COULD PLAY: </Text>
              The game will be stopped at that point, the person committing the
              Foul WILL receives a (50-Point Penalty), then the next Player will
              play.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>NO CHEATING: </Text>
              By WORD, DEED, or ACTION. Any suspected cheating will result in a
              (50-point penalty).
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>SAFETY AND HEALTH REASONS: </Text>
              Smoking is not permitted during game play.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>
                NO REARRANGEMENT, FLASH, OR PICKING UP TILE(S):{' '}
              </Text>
              Once all 7 Tiles have been turned up in your hand, it's considered
              played, if caught WILL receive a (50-Point Penalty).
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>NO REDRAWS OR RESHUFFLE: </Text>
              Due to too many doubles.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>ALL TILE(S) NOT IN THE SHUFFLE: </Text>
              Is the responsibility of all Players. If some are accidentally
              left out, it will be returned & Reshuffled.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>TILE(S) EXPOSED: </Text>
              During the shuffle will be Reshuffled.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>TILE(S) EXPOSED WHILE DRAWING: </Text>
              Will be played by the Player exposing it.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>MISPLAYED TILE: </Text>
              If caught before the next Player plays or passed, will be played
              elsewhere on the table. If it will not play it will be turned
              face-up on the table and played at the first opportunity by the
              Player making the error, WILL receives a (50-Point Penalty). If
              the misplayed Tile is not caught before the next Player play or
              pass, it will stand as the played Tile. (NO PENALTY)
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>
                IF WRONG DOUBLE IS PLAYED ON AS A SPINNER:{' '}
              </Text>
              The Player WILL receive a (50-Point Penalty). If not caught before
              the next Player play or pass, the Tile WILL be removed and played
              at the next opportunity. IF PLAYED OUT OF TURN = That Tile will be
              left face-up on the table and played at the first opportunity,
              Player WILL receive a (50-Point Penalty).
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>A BLOCK GAME: </Text>
              Results only after no Player can play due to all numbers in one
              suit played. Lowest number of points will get all points in the
              Opponent's hands. In the case of a tie, no one gets any points.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>AT THE END OF EACH HAND: </Text>
              All Tiles must be turned up to be viewed by the Opponents. The
              Player that Domino must orally count rounding it to the nearest
              five. If miscounted the Player WILL receive a (50-Point Penalty).
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>SECOND PLACE TIE: </Text>
              All Tiles will be shuffled. The Player that picks the Double Five
              will move on to the next round.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>STARTING EACH ROUND OF PLAY: </Text>
              The (4) Player's will pull one of four Tiles for seating position.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>
                INTERFERING WITH THE CO. EMPOYEES:{' '}
              </Text>
              If caught by WORD and/or ACTION interfering with any employee
              during and not limited to (Signing-up, Setting-up, Breaking-down,
              Serving) will be DISQUALIFIED.
            </Text>
            <Text style={styles.description}>
              <Text style={styles.label}>PLAYING WITH-OUT MEMBERSHIP: </Text>
              If any person is caught using another Player's Membership Card
              WILL be ARRESTED.
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

export default RulesScreen;
