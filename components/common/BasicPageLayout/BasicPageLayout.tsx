import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { withTheme } from "react-native-paper";
import { ThemeExt, Themed } from "../../../common-tools/themes/types/Themed";
import { Styles } from "../../../common-tools/ts-tools/Styles";
import { LinearGradient } from "expo-linear-gradient";

export interface PropsMainPage extends Themed { }

class BasicPageLayout extends Component<PropsMainPage> {

   render(): JSX.Element {
      const { colors, fonts }: ThemeExt = this.props.theme as unknown as ThemeExt;

      return (
         <LinearGradient
            colors={[colors.background, colors.background2]}
            style={styles.mainContainer}
            start={[0, 0.5]}
            end={[0, 1.3]}
         >
            {this.props.children}
         </LinearGradient>
      );
   }
}

const styles: Styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: 10,
   }
});

export default withTheme(BasicPageLayout);