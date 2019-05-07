import { observable, action } from 'mobx';

class UserStore {
    @observable
    region = null;

    @action.bound
    setRegion = region => {
        this.region = region
    }
}

export default UserStore