import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"


export const Login = (props) => {
    const email = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => {
                return res.json()
            })
            .then(user => {
                console.log(user)
               return user !== undefined ? user : false
            })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        //props.history.push("/main")

        existingUserCheck()
            .then(exists => {
                console.log(exists)
                if (exists && exists.password === password.current.value) {
                    localStorage.setItem("rare_user_id", exists.id)
                    props.history.push("/home")
                } else if (exists && exists.password !== password.current.value) {
                    invalidDialog.current.showModal()
                } else if (!exists) {
                   invalidDialog.current.showModal()
                }
                
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Email or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Rare</h1>
                    <h2>Sign In</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> email ddress </label>
                        <input ref={email} type="email" id="email" className="form-control" defaultValue="me@me.com" placeholder="Email address" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> password </label>
                        <input ref={password} type="password" id="password" className="form-control" defaultValue="me" placeholder="Password" required />
                    </fieldset>
                    <fieldset>
                        <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <div>Not a member yet?</div>
                <Link to="/register">Register Here</Link>
            </section>
        </main>
    )
}
