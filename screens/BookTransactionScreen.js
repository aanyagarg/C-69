import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import { createKeyboardAwareNavigator } from 'react-navigation';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BookTransaction extends React.Component
{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions : null,
            scanned : false,
            scannedData : '',
            buttonState : 'normal',

        }
    }

    getCameraPermissions = async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions : status==="granted",
            buttonState : 'clicked',
            scanned : false
        })
    }

  handleBarCodeScanned=async({type,data})=>{
      this.setState({
          scanned : true,
          scannedData : data,
          buttonState : 'normal'
      })
  }  

    render()
    {
        const hasCameraPermissions = this.state.hasCameraPermissions;
         const scanned = this.state.scanned;
         const buttonState = this.state.buttonState;

         if(buttonState==="clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned = {scanned?undefined : this.handleBarCodeScanned}
                style = {StyleSheet.absoluteFillObject}
                />
            )

         }
         else if (buttonState==="normal"){

         
        return(
            <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>
                    {hasCameraPermissions===true ? this.state.scannedData:"Request Camera Permissions"}
                </Text>

                <TouchableOpacity onPress = {this.getCameraPermissions} style={styles.scanButton} >
                    <Text style ={styles.buttonText}>Scan QR Code</Text>
                </TouchableOpacity>
            </View>
        )
    }

}
}
const styles = StyleSheet.create({
    scanButton:{
        backgroundColor : 'cyan',
        padding : 10,
        margin : 10,

    },
    buttonText :{
        color : 'red',
        fontSize : 20,
    }
    
})
