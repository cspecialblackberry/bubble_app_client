import { useState, Component, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { SEARCH_USERS } from '../../utils/queries'
import { useQuery } from '@apollo/client'

import "./style.css";
import { SearchResultsList } from "./SearchResultsList";

export const SearchBar = ({ setResults }) => {

    const userSearch = useQuery(SEARCH_USERS)
    // let users = []

    // if (userSearch.data) {
    //     users = userSearch.data
    // }

    // const [filteredResults, setFilteredResults] = useState(users)
    const [allUsers, setAllUsers] = useState([])
    const [filteredResults, setFilteredResults] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (event) => {
        event.preventDefault()
        const query = event.target.value
        setSearchQuery(query)
    }
    const handleFilter = () => {
        if (searchQuery === "") {
            setFilteredResults([])
        } else {
            const filteredUsers = allUsers.filter((user) => user.username.toLowerCase().includes(searchQuery.toLowerCase()))
            setFilteredResults(filteredUsers)
        }
    }

    useEffect(() => {
        if (userSearch.data) {
            setAllUsers(userSearch.data.users)
        }
    }, [userSearch])

    useEffect(() => {
        handleFilter()
    }, [searchQuery])

    return (
        <>
            <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                    type="text"
                    name="search"
                    placeholder="Search people..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            {searchQuery !== "" && <SearchResultsList results={filteredResults} />}
        </>
    );
};
