import axios from 'axios'

function fetchData(data) {
    console.log(data)
    return axios.get(`https://api.github.com/users/${data}`)
}

// userdataURL contains the api for the repository of the user
function fetchRepos(userDataURL) {
    return axios.get(userDataURL)
}

// API for the fetching the stats of the particular repo
function fetchStats(repoName,Owner)
{
    return axios.get(`https://api.github.com/repos/${Owner}/${repoName}/stats/commit_activity`)
}
export default fetchData
export {fetchData , fetchRepos , fetchStats}