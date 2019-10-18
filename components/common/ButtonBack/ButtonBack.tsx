import React, { Component } from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { FAB, FABProps } from "react-native-paper";
import { Styles } from "../../../common-tools/ts-tools/Styles";
import { NavigationScreenProp, NavigationInjectedProps, withNavigation } from "react-navigation";
import { currentTheme } from "../../../config";

export interface Props extends NavigationInjectedProps, Partial<FABProps> { }

class ButtonBack extends Component<Props> {
   static defaultProps: Partial<Props> = {};

   render(): JSX.Element {
      const { goBack }: NavigationScreenProp<{}> = this.props.navigation;

      return (
         <View style={styles.container}>
            <TouchableNativeFeedback onPress={() => goBack()}>
               <FAB
                  style={styles.fab}
                  icon="arrow-back"
                  onPress={() => goBack()}
                  small
                  {...this.props}
               />
            </TouchableNativeFeedback>
         </View>
      );
   }
}

const styles: Styles = StyleSheet.create({
   container: {
      position: "absolute",
      padding: 20,
      left: 0,
      top: 25,
      zIndex: 100,
   },
   fab: {
      backgroundColor: currentTheme.colors.background2
   },
});

export default withNavigation(ButtonBack);
