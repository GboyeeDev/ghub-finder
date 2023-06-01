import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alerts/AlertContext';
import { searchUsers } from '../../context/github/GithubActions';

function UserSearch() {
  const { users, dispatch,} = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const [text, setText] = useState('');

  const changeHandler = (e) => setText(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!text) {
      setAlert('Enter text!!', 'error');
    } else {
      // isLoading
      dispatch({type: 'SET_ISLOADING'})
      // search user
      const users = await searchUsers(text);
      dispatch({type: 'GET_USERS', payload: users});

      setText('');
    }
  };

  // clear users
  const clearUsers = () => {
    dispatch({type: 'CLEAR_USERS'})
  };
  return (
    <div className="grid grid=cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-8">
      <div>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={changeHandler}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* To make clear not to show if there users searches */}
      {users.length > 0 && (
        <div>
          <button onClick={clearUsers} className="btn btn-ghost btn-lg">Clear</button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
