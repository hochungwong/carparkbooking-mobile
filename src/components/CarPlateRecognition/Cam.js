import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Camera from 'react-native-openalpr';

import { inject, observer } from 'mobx-react';
import firebase from 'react-native-firebase';

import { connect } from 'react-redux';
import * as actions from '../../stores/actions/index';

const { width, height } = Dimensions.get('window');

//Cam recognition
class Cam extends Component {
    constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
      },
      plate: 'Scan a plate',
      confidence:''
    };
  }

  onPlateRecognized = ({ plate, confidence }) => {
    if (confidence > 88) {
      this.setState({
        plate,
        confidence: confidence
      })
    }else{
      this.setState({
        confidence: confidence
      })
    }
  }

  postCarplate = async plate => {
      const {userId ,onSubmitCarPlate} = this.props;
      await onSubmitCarPlate(userId, plate);
      await this.props.navigation.navigate('Main');
  }

  render() {
    const { plate, confidence ,camera} = this.state;
    const varTop = height - 125;
    const hitSlop = {
      top: 15,
      bottom: 15,
      left: 15,
      right: 15
    };
    const childStyle = vheHeight => {
      return {
        position: 'absolute',
        top: vheHeight,
        left: 10,
        right: 10,
        backgroundColor: 'transparent',
        alignItems: 'center'
      }
    }

    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={camera.aspect}
          captureQuality={Camera.constants.CaptureQuality.high}
          country="au"
          onPlateRecognized={this.onPlateRecognized}
          plateOutlineColor= { confidence > 88 ? "08F825" : "FD000C"}
          showPlateOutline = {true}
          torchMode={Camera.constants.TorchMode.auto}
          touchToFocus={true}
        />
        {/* <View style={[styles.overlay, styles.topOverlay]}>
          <View style={[styles.overlay, styles.bottomOverlay]}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{this.state.plate}</Text>
            </View>
          </View>
        </View> */}
        {/* <View style={styles.textContainer}>
          <Text style={styles.text}>{ confidence > 88 ? plate : confidence}</Text>
        </View>
      </View> */}
        <View style={childStyle(varTop)}>
            {confidence > 88 ?
                <TouchableOpacity
                    style={styles.camButton}
                    hitSlop = {hitSlop}
                    activeOpacity = {0.7}  
                    onPress = {()=> {this.postCarplate(plate)}}
                >
                    <Text style={styles.camButtonText}>
                        {plate} >
                    </Text>
                </TouchableOpacity>
                :
                <Text style={styles.noRecognizeButtonText}>
                    Please place car plate within the triangel
                </Text>
            }
        </View>
       </View> 
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitCarPlate: (userId, plate) => dispatch(actions.submitCarPlate(userId, plate))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cam) ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    top: 100,
    right: 50,
    bottom: 0,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color:'white'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
//   overlay: {
//     position: 'absolute',
//     padding: 16,
//     alignItems: 'center',
//   },
//   topOverlay: {
//     top: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0, 255, 0, 0.4)',
//     alignItems: 'center',
//   },
//   bottomOverlay: {
//     right: 0,
//     left: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(255,0,0,0.4)',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  camButton: {
    width: 100,
    height: 100,
    borderRadius: 85/2,
    backgroundColor: 'rgba(252, 253, 253, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'white',
    shadowRadius: 8,
    shadowOpacity: 0.12,
    opacity: .6,
    zIndex: 10,
  },
  camButtonText: {
    fontWeight: 'bold',
    color: 'black'
  },
  noRecognizeButtonText: {
    fontWeight: 'bold',
    color: 'white'
  }
});