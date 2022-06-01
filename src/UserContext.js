import React from 'react'

//It creates a Context object
//A context onbject, as the name states is a data type of an object that can be used to store information that can be shared to other components
//We used this to avoid prop-drilling (Calling nested children, no need to call many child)

const UserContext = React.createContext();

//Provider Component -> Allows the other components to consume/use the context object and supply the necessary information needed to the context object
export const UserProvider = UserContext.Provider;

export default UserContext;