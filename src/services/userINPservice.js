import axios from 'axios'

function fetchData(data) {
    console.log(data)
    return axios.get(`https://api.github.com/users/${data}`)
}

// userdataURL contains the api for the repository of the user
function fetchRepos(userDataURL) {
    return axios.get(userDataURL)
}
export default fetchData
export {fetchData , fetchRepos}