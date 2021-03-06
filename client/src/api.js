import axios from 'axios'

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:5000/api',
  withCredentials: true,
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error('API response', err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')
  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'))
  },

  // This method signs up and logs in the user
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service.get('/logout')
  },

  // This is an example on how to use this method in a different file
  // api.getCountries().then(countries => { /* ... */ })
  getCountries() {
    return service
      .get('/countries')
      .then(res => res.data)
      .catch(errHandler)
  },

  getBoards() {
    return service
      .get('/boards')
      .then(res => res.data)
      .catch(errHandler)
  },

  getMyBoards() {
    return service
      .get('/myBoards')
      .then(res => res.data)
      .catch(errHandler)
  },

  deletePost(adId) {
    return service
      .delete('/myBoards/' + adId)
      .then(res => res.data)
      .catch(errHandler)
  },

  getAdDetail(adId) {
    return service
      .get('/boards/' + adId)
      .then(res => res.data)
      .catch(errHandler)
  },

  addComment(uploadData, adId) {
    return service
      .post('/boards/' + adId, uploadData)
      .then(res => res.data)
      .catch(errHandler)
  },
  updateAd(profileData) {
    return service
      .put('/user', profileData)
      .then(res => res.data)
      .catch(errHandler)
  },

  getProfile() {
    return service
      .get('/user')
      .then(res => res.data)
      .catch(errHandler)
  },

  getAnotherProfile(userId) {
    return service
      .get('/user/' + userId)
      .then(res => res.data)
      .catch(errHandler)
  },

  updatePicture(profilePic) {
    return service
      .put('/user', profilePic)
      .then(res => res.data)
      .catch(errHandler)
  },

  updateProfile(profileData) {
    return service
      .put('/user', profileData)
      .then(res => res.data)
      .catch(errHandler)
  },

  getIncomingRequests() {
    return service
      .get('/requests/incoming-requests')
      .then(res => res.data)
      .catch(errHandler)
  },

  createRequest(adId, message) {
    return service
      .post('/requests/create-request/' + adId, message)
      .then(res => res.data)
      .catch(errHandler)
  },

  handleRequests(requestId, answer) {
    return service
      .put('/requests/handle-requests/' + requestId, answer)
      .then(res => res.data)
      .catch(errHandler)
  },
  addAd(uploadData) {
    return service
      .post('/postjam', uploadData)
      .then(res => res.data)
      .catch(errHandler)
  },

  addWanted(uploadData) {
    return service
      .post('/postwanted', uploadData)
      .then(res => res.data)
      .catch(errHandler)
  },

  addPost(uploadData) {
    return service
      .post('/showOff', uploadData)
      .then(res => res.data)
      .catch(errHandler)
  },

  addCountry(body) {
    return service
      .post('/countries', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  /*   addPicture(formData) {
    
    return service
      .put('/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  }, */
}
