import React from "react"
import { Favorite, Help, Info, Like, Trophy } from "grommet-icons"
import { MyIcon } from "../utils/MyIcon"

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
        "image_url": <Help/>
    },
    {
        "id": 4,
        "label": "insightful",
        "image_url": <Info/>
    },
    {
        "id": 5,
        "label": "celebrate",
        "image_url": <Trophy/>
    }
]