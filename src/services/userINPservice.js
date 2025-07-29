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

// API FOR FETCHING REPO CONTRIBUTERS
function fetchContributers(name,owner)
{
    return axios.get(`https://api.github.com/repos/${owner}/${name}/contributors`)
}

// API FOR FETCHING THE LANGUAGE OF THE REPOSITORY
function fetchLanguage(name , owner)
{
    return axios.get(`https://api.github.com/repos/${owner}/${name}/languages`)
}

// API FOR FETCHING THE ISSUES
function fetchIssues(name , owner)
{
    return axios.get(`https://api.github.com/repos/${owner}/${name}/issues?state=open`)
}
export default fetchData
export {fetchData , fetchRepos , fetchStats, fetchContributers,fetchLanguage , fetchIssues}