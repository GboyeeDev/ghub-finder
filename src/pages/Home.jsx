import React from 'react'
import UsersearchResult from '../components/users/UsersearchResult';
import UserSearch from '../components/users/UserSearch';

function Home() {
  return (
    <>
        <UserSearch />
        <UsersearchResult />
    </>
  )
}

export default Home

{/* {import.meta.env.VITE_GITHUB_TOKEN} */}