import { createContext, useContext, useState } from "react";

const AuthContext = createContext()


export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
        const host = process.env.REACT_APP_HOST

        const [user, setUser] = useState([])
    
        // state to check if the user is logged in
        const [isAuthenticated, setIsAuthenticated] = useState(() => {
            const token = localStorage.getItem('token');

            if(token){
                return true
            }else{
                return false
            }
        })

        // Singup handling
        const createUser = async({name, username, email, password}) => {
            try {
                const response = await fetch(`${host}/api/auth/createuser`, {
                    method: 'POST', 
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name, username, email, password})
                });
                const json = await response.json()
        
                if(json.success){
                    localStorage.setItem('token', json.authToken)
                    setIsAuthenticated(true)
                    console.log("User successfully created!")
                }else{
                    console.log({error: json.error})
                }
                
            } catch (error) {
                console.log(error)
            }
            
        }


        // Login handling
        const loginUser = async({email, password}) => {
            try {
                const response = await fetch(`${host}/api/auth/login`, {
                    method: 'POST', 
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email, password})
                });
                const json = await response.json()
        
                if(json.success){
                    localStorage.setItem('token', json.authToken)
                    setIsAuthenticated(true)
                    console.log('Logged in successfully')
                    return Promise.resolve()
                }else{
                    console.log({error: json.error})
                }
                
            } catch (error) {
                console.log(error)
            }
            
        }  

        // Get user detail handling
        const getUser = async () => {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token')
                }
            });
            const json = await response.json()
            setUser(json)
        }
        

        

    const value={
        createUser,
        loginUser,
        isAuthenticated,
        setIsAuthenticated,
        user,
        getUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}