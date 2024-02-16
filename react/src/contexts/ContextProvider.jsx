import { Children, createContext, useContext, useState } from "react";


const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => {},
    setUserToken: () => {}
});


// Temporary Data 

const tmpSurveys = [
    
    {   
        "id": 1,
        "name": "Adeel Solangi",
        "language": "Sindhi",
        "slug": "V59OF92YF627HFY0",
        "bio": "Donec lobortis eleifend condimentum. Cras dictum dolor lacinia lectus vehicula rutrum. Maecenas quis nisi nunc. Nam tristique feugiat est vitae mollis. Maecenas quis nisi nunc.",
        "version": 6.1
      },
      {
        "id": 2,
        "name": "Afzal Ghaffar",
        "language": "Sindhi",
        "slug": "ENTOCR13RSCLZ6KU",
        "bio": "Aliquam sollicitudin ante ligula, eget malesuada nibh efficitur et. Pellentesque massa sem, scelerisque sit amet odio id, cursus tempor urna. Etiam congue dignissim volutpat. Vestibulum pharetra libero et velit gravida euismod.",
        "version": 1.88
      },
      {
        "id": 3,
        "name": "Aamir Solangi",
        "language": "Sindhi",
        "slug": "IAKPO3R4761JDRVG",
        "bio": "Vestibulum pharetra libero et velit gravida euismod. Quisque mauris ligula, efficitur porttitor sodales ac, lacinia non ex. Fusce eu ultrices elit, vel posuere neque.",
        "version": 7.27
      }

];




export const ContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({
        name: 'Tom Cook',
        email: 'tom@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    });
    const [userToken, setUserToken] = useState('1234');
    const [surveys, setSurveys] = useState(tmpSurveys);

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            surveys
        }} >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)