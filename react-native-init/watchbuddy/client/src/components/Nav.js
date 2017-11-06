import React from 'react';

import {
  Button,
  Header
} from 'react-native-elements';

import {
  ActionSheetIOS,
  Linking,
  View,
  Text
} from 'react-native';

import Mailer from 'react-native-mail';
// var Mailer = require('NativeModules').RNMail
import { textWithoutEncoding, email } from 'react-native-communications'

import axios from 'axios';

const ICON_STYLES = {
  size: 25,
  color: '#444'
}

const BUTTON_STYLES = {
  backgroundColor: 'none'
}

var BUTTONS = [
  'View Favorites',
  'Share',
  'Send Feedback',
  'Cancel',
];

var CANCEL_INDEX = 3;

export default class Nav extends React.Component {
  constructor({ dimensions, changeView, fbToken }) {
    super();
    this.state = {
      clicked: 'none'
    };
  }

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX
    },
    (buttonIndex) => {
      // set state
      if (buttonIndex === 1) {
        // this.handleHelp();
        // Linking.openURL('mailto:somethingemail@gmail.com?subject=abcdefg&body=body')
        textWithoutEncoding(null, 'Hey! Check out watchbuddy.io on the App Store for great AI based movie recommendations!')
      } else if (buttonIndex === 2) {
        email(['support@watchbuddy.io'], null, null, null, 'Thanks for reaching out! We promise to take care of you. Let us know your issue below:')
      } else if (buttonIndex === 0) {
        axios.get(`http://13.57.94.147:3000/favorites`,{params:{fbToken:this.props.fbToken.userID}})
          .then(data => console.log(data))
          .catch(err => console.log(err))
        this.props.changeView('Favorites');
      }
    });
  }

  handleHelp() {
    Mailer.mail({
      subject: 'need help',
      recipients: 'support@example.com',
      body: 'asdf',
      isHTML: true,
    }, (error, event) => {
        if(error) {
          console.log(error, 'Error', 'Could not send mail. Please send us an email to support@example.com');
        }
    });
  }

  render() {
    return (
      <Header style={{ width: this.props.dimensions.width, height: this.props.dimensions.height, flexDirection: "row", justifyContent: 'space-between' }}
        leftComponent={<Button icon={{ name: 'more-horiz', size: ICON_STYLES.size, color: ICON_STYLES.color }} buttonStyle={{ backgroundColor: '#FFF' }} onPress={() => this.showActionSheet()}/>}
        centerComponent={<Button title={'watchbuddy.io'} buttonStyle={{ backgroundColor: '#FFF' }} textStyle={{ color: '#444', fontSize: 20 }} />}
        rightComponent={<Button icon={{ name: 'home', size: ICON_STYLES.size, color: ICON_STYLES.color }} buttonStyle={{ backgroundColor: '#FFF' }} onPress={() => this.props.changeView('MovieGridList')} />}
      />
    );
  }
}


// var MailExampleApp = React.createClass({
//   handleHelp: function() {
//     Mailer.mail({
//       subject: 'need help',
//       recipients: ['support@example.com'],
//       ccRecipients: ['supportCC@example.com'],
//       bccRecipients: ['supportBCC@example.com'],
//       body: '',
//       isHTML: true,
//       attachment: {
//         path: '',  // The absolute path of the file from which to read data. 
//         type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf 
//         name: '',   // Optional: Custom filename for attachment 
//       }
//     }, (error, event) => {
//         if(error) {
//           AlertIOS.alert('Error', 'Could not send mail. Please send us an email to support@example.com');
//         }
//     });
//   },  
//   render: function() {
//     return (
//       <TouchableHighlight
//             onPress={row.handleHelp}
//             underlayColor="#f7f7f7">
//           <View style={styles.container}>
//             <Image source={require('image!announcement')} style={styles.image} />
//           </View>
//        </TouchableHighlight>
//     );
//   }
// });
