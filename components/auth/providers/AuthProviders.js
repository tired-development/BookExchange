import firebase from 'firebase'

var Providers = {
    github: GITHUB_PROVIDER
};
export default Providers;

const GITHUB_PROVIDER = {
    id: '9dfa8b412813520848a7',
    secret: '475bd0aab4aa0c7c677da96dd28cf7ad74abb421',
    baseUrl: 'https://github.com/login/oauth/',
    scopes: ['user'],
    storageKey: "password123",
    firebaseAuth: firebase.auth.GithubAuthProvider
};