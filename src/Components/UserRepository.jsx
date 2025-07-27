import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { fetchRepos } from '../services/userINPservice'
import './UserRepository.css'

const UserRepository = () => {
    const location = useLocation();
    const userDataURL = location.state;

    const [userRepData, setuserRepdata] = useState([]);
    const [sortInp, setsortInp] = useState('');
    const [showsortInp, setShowsortInp] = useState([]);
    const [sortOption, setSortOption] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Get paginated items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = showsortInp.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(showsortInp.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    useEffect(() => {
        handleRepos();
    }, [userDataURL]);

    useEffect(() => {
        const filteredData = userRepData.filter(item =>
            item.name.toLowerCase().includes(sortInp.toLowerCase())
        );
        setShowsortInp(filteredData);
        setCurrentPage(1); // reset to first page on search
    }, [sortInp, userRepData]);

    async function handleRepos() {
        try {
            const personRepoInfo = await fetchRepos(userDataURL);
            setuserRepdata(personRepoInfo.data);
            setShowsortInp(personRepoInfo.data);
        } catch (err) {
            console.log("error is", err);
        }
    }

    const handleSort = (e) => {
        const option = e.target.value;
        setSortOption(option);
        const sortedRepos = [...showsortInp];

        switch (option) {
            case 'name':
                sortedRepos.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'stars':
                sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
                break;
            case 'forks':
                sortedRepos.sort((a, b) => b.forks - a.forks);
                break;
            default:
                break;
        }

        setShowsortInp(sortedRepos);
        setCurrentPage(1); // reset to first page after sort
    };

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
    };



    const navigateview = useNavigate();

    function handleview()
    {
        navigateview('/details')
    }

    return (
        <div className="repository-container">
            <div className='search-filter'>
                <input
                    type="text"
                    value={sortInp}
                    onChange={(e) => setsortInp(e.target.value)}
                    placeholder="Search Repositories"
                />
                <select id="sort" value={sortOption} onChange={handleSort}>
                    <option value="">Sort</option>
                    <option value="name">Name (A–Z)</option>
                    <option value="stars">Stars (High to Low)</option>
                    <option value="forks">Forks (High to Low)</option>
                </select>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Forks</th>
                            <th>Stars</th>
                            <th>Open Issues</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.forks}</td>
                                <td>{item.stargazers_count}</td>
                                <td>{item.open_issues}</td>
                                <td><button onClick={handleview} className='viewclick'>View</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={number === currentPage ? 'active' : ''}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserRepository;
