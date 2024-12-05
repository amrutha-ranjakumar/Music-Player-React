import React, { createContext, useState } from 'react'


export const addprojectResponseContext = createContext();
export const editprojectResponseContext = createContext();
export const isAuthTokenContext = createContext();

function ContextShare({ children }) {
  //children is a predefined props used to share data between components
  //create a state that need to shared
  const [addprojectResponse, setAddprojectResponse] = useState({})
  const [editprojectResponse, seteditprojectResponse] = useState({})
  const [isAuthToken, setisAuthToken] = useState(false)


  return (
    <>

      <addprojectResponseContext.Provider value={{ addprojectResponse, setAddprojectResponse }}>
        <editprojectResponseContext.Provider value={{ editprojectResponse, seteditprojectResponse }}>
          <isAuthTokenContext.Provider value={{ isAuthToken, setisAuthToken }}>

            {children}
          </isAuthTokenContext.Provider>

        </editprojectResponseContext.Provider>
      </addprojectResponseContext.Provider>

    </>
  )
}

export default ContextShare