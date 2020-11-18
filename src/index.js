import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Rare } from "./components/Rare.js"
import {Grommet} from "grommet"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Grommet>
            <Router>
                <Rare />
            </Router>
        </Grommet>
    </React.StrictMode>,
    document.getElementById("root")
)
