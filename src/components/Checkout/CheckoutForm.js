import React, { Component } from 'react';
import { View, StyleSheet ,Platform} from 'react-native';
import { Container, Button, Icon } from 'native-base';

class CheckoutForm extends Component{
    render(){
        return(
            <Container>
                <View style={styles.info__header__style}>
					<View style={styles.info__header__button}>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon
								type='Ionicons'
								name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-down'}
								style={styles.info__header__icon}
							/>
						</Button>
					</View>
				</View>
            </Container>
        )
    }
}

export default CheckoutForm ;

const styles = StyleSheet.create({
    info__header__style: {
		height: 100,
		flexDirection: 'column',
		backgroundColor: 'transparent',
		borderBottomWidth: 0,
	},
	info__header__button: {
		alignSelf: 'flex-start',
		marginTop:20,
		marginLeft:20
	},
	info__header__view: {
		alignSelf: 'center'
	},
	info__header__icon: {
		color: 'black',
		fontSize: Platform.OS === 'ios' ? 30 : 25,
		marginLeft: 0,
		marginTop: 0
    },
})