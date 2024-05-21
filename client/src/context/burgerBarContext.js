import {useState, createContext, useContext} from "react";

const BurgerBarContext = createContext();

export const BurgerBarContextProvider = ({children}) => {
    const [isMenuClicked, setIsMenuClicked] = useState(false)
    const [burger_class, setBurgerClass] = useState('burger-bar unclicked')
    const [menu_class, setMenuClass] = useState('menuItems hidden')
    return (
        <BurgerBarContext.Provider value={{isMenuClicked, setIsMenuClicked, burger_class, setBurgerClass, menu_class, setMenuClass}}>
            {children}
        </BurgerBarContext.Provider>
    )
}

export const UseBurgerBarContext = () => useContext(BurgerBarContext)
