import { observable, action, decorate} from 'mobx';

class AuthStore {
    access_token = null;
    userId = null;

    setToken = token => [
        this.access_token = token
    ]

    setUserId = userId => {
        this.userId = userId
    }

    wipeUserId = () => {
        this.userId = null;
    }

    wipeToken = () => {
        this.access_token = null
    }
}

decorate(AuthStore, {
    access_token: observable,
    userId: observable,
    setToken: action,
    setUserId: action,
    wipeUserId: action,
    wipeToken: action
})

export default AuthStore ;