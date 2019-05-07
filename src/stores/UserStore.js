import { observable, action, decorate} from 'mobx';

const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = 0.001;

export default class UserStore {
    region = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longtiudeDelta: LONGITUDE_DELTA
    };
    isCarparkTab = false;
    currentAddress = "";

    setRegion = newRegion => Object.assign(this.region, newRegion)

    setLat = lat => {
        this.region.latitude = lat
    }

    setLng = lng => {
        this.region.longitude = lng
    }

    setCarparkTab = () => {
        this.isCarparkTab = !this.isCarparkTab;
    }

    setAddress = address => {
        this.currentAddress = address;
    }
}

decorate(UserStore, {
    region: observable,
    isCarparkTab: observable,
    currentAddress: observable,

    setRegion: action,
    setLat: action,
    setLng: action,
    setCarparkTab: action,
    setAddress: action
})
