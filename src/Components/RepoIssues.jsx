import React, { useEffect, useState } from 'react'
import { fetchIssues } from '../services/userINPservice'

const RepoIssues = ({name,owner}) => {

    const [issues, setIssues] = useState([]);



    useEffect(() => {
      repoIssues()
    
    }, [name,owner])
    
    async function repoIssues()
    {
        try{
            const Issues = await fetchIssues(name,owner)
            console.log("issues are",Issues)
            setIssues(Issues.data)
        }
        catch(err)
        {
            console.log(err)
        }
    }
  return (
    <div>
        <h2>issues</h2>
        {issues &&issues.map(issue => (
          <li key={issue.id}>
            <a
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              #{issue.number} - {issue.title}
            </a>
            <span className="ml-2 text-gray-400">({issue.comments} comments)</span>
          </li>
        ))}

    </div>
  )
}

export default RepoIssues