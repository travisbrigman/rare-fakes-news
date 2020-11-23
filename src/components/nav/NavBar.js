//renders nav links that redirect user to various paths
import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../Profiles/UserProvider"
import Logo from "../nav/RareStampLogo2.svg"
import { Anchor, Image, Nav } from "grommet"

export const NavBar = () => {
    const history = useHistory()

    const { getCurrentUser, setCurrentUser, currentUser } = useContext(UserContext)

    useEffect(() => {
        getCurrentUser().then( res =>
            setCurrentUser(res)
        )
    }, [])

    return (
        <section className="container--navbar">            
        <Nav direction="row-responsive" background="brand" className="navbar" pad="small" align="baseline">
                <Image className="navbar__logo" src={Logo} />

                <Anchor as={Link} className="navbar__link" to="/home" label="Home"/>
                <Anchor as={Link} className="navbar__link" to="/myposts" label="My Posts"/>
                <Anchor as={Link} className="navbar__link" to="/profile"label="My Profile"/>
                <Anchor as={Link} className="navbar__link" to="/users" label="All Users"/>
                <Anchor as={Link} className="navbar__link" to="/tags" label="Tag Management"/>
                <Anchor as={Link} className="navbar__link" to="/categories" label="Category Management"/>
            {currentUser.user.is_staff ? 
                <Anchor as={Link} className="navbar__link" to="/admin/posts" label="Post Management"/>
             : null}
            
            {
                (localStorage.getItem("rare_user_id") !== null) ?
                        <Anchor as={Link} className="navbar__item__fakeLink"
                            onClick={() => {
                                localStorage.removeItem("rare_user_id")
                                history.push({ pathname: "/" })
                            }}
                        label="Logout"/>
                     :
                    <>
                            <Anchor as={Link} className="nav-link" to="/login" label="Login"/>
                            <Anchor as={Link} className="nav-link" to="/register" label="Register"/>
                    </>
            }        </Nav>
        </section>
    )
}
