// simple class used to map function-call requests for data to HTTP promises
export default class API {
  constructor() {
    this.root = '/api';
  }
  _doGet(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(console.error);
  }
  // get the list of drones
  getDrones() {
    return this._doGet(`${this.root}/drones`);
  }
  // get the city corresponding to the client's request (could be done via
  // geo-IP, could be done via user profile
  getCity() {
    return this._doGet(`${this.root}/city`);
  }
}
