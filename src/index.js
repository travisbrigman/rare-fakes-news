import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Rare } from "./components/Rare.js"
import {Grommet} from "grommet"
// import "./index.css"
import {theme} from "./theme.js"


ReactDOM.render(
    <React.StrictMode>
        <Grommet theme={theme} full>
            <Router>
                <Rare />
            </Router>
        </Grommet>
    </React.StrictMode>,
    document.getElementById("root")
)
