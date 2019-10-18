import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Permissions from "expo-permissions";
import { withTheme } from "react-native-paper";
import { ThemeExt, Themed } from "../../../common-tools/themes/types/Themed";
import { Styles } from "../../../common-tools/ts-tools/Styles";
import BasicPageLayout from "../../common/BasicPageLayout/BasicPageLayout";
import { askForPermissions } from "../../../common-tools/permissions/askForPermissions";
import RNSoundLevel from "react-native-sound-level";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonBack from "../../common/ButtonBack/ButtonBack";

interface PropsLoudDetectorPage extends Themed { }
interface State {
   itsLoud: boolean;
}

class LoudDetectorPage extends Component<PropsLoudDetectorPage, State> {
   state: State = {
      itsLoud: false
   };

   async componentDidMount(): Promise<void> {
      await askForPermissions(Permissions.AUDIO_RECORDING);
      RNSoundLevel.start();
      RNSoundLevel.onNewFrame = data => {
         this.setState({
            itsLoud: data.value > -50
         });
      };
   }

   render(): JSX.Element {
      const { colors, fonts }: ThemeExt = this.props.theme as unknown as ThemeExt;
      const { itsLoud }: State = this.state;

      return (
         <BasicPageLayout>
            <ButtonBack />
            <View style={styles.mainContainer}>
               {
                  itsLoud ?
                     <Icon name="flash" size={150} color={colors.background2} />
                  :
                     <Text style={[styles.textBlock, { color: colors.textLogin, fontFamily: fonts.light }]}>
                        It's not loud, say something loud
                     </Text>

               }
            </View>
         </BasicPageLayout>
      );
   }

   componentWillUnmount(): void {
      RNSoundLevel.stop();
   }
}

const styles: Styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      padding: 18,
   },
   textBlock: {
      marginBottom: 15,
      textAlign: "center",
   },

});

export default withTheme(LoudDetectorPage);