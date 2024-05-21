import {UseBurgerBarContext} from "../context/burgerBarContext";


const BurgerMenu = () => {

    const {isMenuClicked, setIsMenuClicked, burger_class, setBurgerClass, setMenuClass} = UseBurgerBarContext()

    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass('burger-bar clicked')
            setMenuClass('menuItems visible')
        } else {
            setBurgerClass('burger-bar unclicked')
            setMenuClass('menuItems hidden')
        }
        setIsMenuClicked(prev => !prev)
    }

    return (
        <div className="burger-menu" onClick={updateMenu}>
            <div className={burger_class}></div>
            <div className={burger_class}></div>
            <div className={burger_class}></div>
        </div>
    )
}

export default BurgerMenu;
