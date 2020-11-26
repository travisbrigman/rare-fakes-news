import React from "react"
import { Favorite, Info, Like } from "grommet-icons"
import { MyIcon } from "../utils/MyIcon"
import { Questioning } from "../utils/Questioning"

export const reactionIcons = [
    {
        "id": 1,
        "label": "like",
        "image_url": <Like/>
    },
    {
        "id": 2,
        "label": "love",
        "image_url": <Favorite/>
    },
    {
        "id": 3,
        "label": "curious",
        "image_url": <Questioning/>
    },
    {
        "id": 4,
        "label": "insightful",
        "image_url": <Info/>
    },
    {
        "id": 5,
        "label": "celebrate",
        "image_url": <MyIcon/>
    }
]