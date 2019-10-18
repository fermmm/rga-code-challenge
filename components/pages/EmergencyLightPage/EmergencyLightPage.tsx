import React, { Component } from "react";
import { StyleSheet, View, TouchableNativeFeedback } from "react-native";
import { withTheme } from "react-native-paper";
import { ThemeExt, Themed } from "../../../common-tools/themes/types/Themed";
import { Styles } from "../../../common-tools/ts-tools/Styles";
import BasicPageLayout from "../../common/BasicPageLayout/BasicPageLayout";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonBack from "../../common/ButtonBack/ButtonBack";
// @ts-ignore
import Torch from "react-native-torch";

interface PropsEmergencyLightPage extends Themed { }
interface State {
   lightIsOn: boolean;
}

class EmergencyLightPage extends Component<PropsEmergencyLightPage, State> {
   state: State = {
      lightIsOn: false
   };

   componentDidMount(): void {
      Torch.switchState(this.state.lightIsOn);
   }

   render(): JSX.Element {
      const { colors, fonts }: ThemeExt = this.props.theme as unknown as ThemeExt;
      const { lightIsOn }: State = this.state;

      return (
         <BasicPageLayout>
            <View style={styles.mainContainer}>
               <ButtonBack />
               <TouchableNativeFeedback
                  onPress={() => this.setState({ lightIsOn: !lightIsOn }, () => this.onLightStateChange())}
               >
                  <Icon name="weather-sunny" size={150} color={lightIsOn ? colors.accent2 : colors.background2} />
               </TouchableNativeFeedback>
            </View>
         </BasicPageLayout>
      );
   }

   onLightStateChange(): void {
      Torch.switchState(this.state.lightIsOn);
   }
}

const styles: Styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
   },
});

export default withTheme(EmergencyLightPage);