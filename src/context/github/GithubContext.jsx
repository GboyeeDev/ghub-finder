import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    isLoading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState);


  // Fetch users from backend
  // const fetchUsers = async () => {
  //   setIsLoading()
    
  //   const response = await fetch(`${GITHUB_URL}/users`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   });

  //   const data = await response.json();

  //   dispatch({
  //     type: 'GET_USERS',
  //     payload: data,
  //   })
  // };

  // Search users from the api
  const searchUsers = async (text) => {
    setIsLoading();

    const params = new URLSearchParams({
      q: text
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });


    // I am getting items from github api
    const { items } = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  };

  // to clear users when they are done searching
  const clearUsers = () => dispatch({
    type: 'CLEAR_USERS'
  })

  // set isLoading into function so it can be used easily
  const setIsLoading = () => {
    dispatch({type: 'SET_ISLOADING'})
  };


  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        searchUsers,
        clearUsers
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
