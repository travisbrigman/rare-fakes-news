import React from "react"
import { Favorite, Info, Like } from "grommet-icons"
import { MyIcon } from "../utils/MyIcon"
import { Questioning } from "../utils/Questioning"
import { uuidv4 } from "../utils/uuid"


export const reactionIcons = [
    {
        "id": "2f596f85-f073-4db1-a700-2b48a493af6a",
        "label": "like",
        "image_url": <Like/>
    },
    {
        "id": "45762d27-7323-49ba-b0c0-0232cb25a494",
        "label": "love",
        "image_url": <Favorite/>
    },
    {
        "id": "dfe2b960-e092-4637-8df8-a48bba36b690",
        "label": "curious",
        "image_url": <Questioning/>
    },
    {
        "id": "9cd02aef-23f1-497c-9fb3-849319dded76",
        "label": "insightful",
        "image_url": <Info/>
    },
    {
        "id": "3e314838-9aca-4c91-bea9-5c1d1c0d82b1",
        "label": "celebrate",
        "image_url": <MyIcon/>
    }
]