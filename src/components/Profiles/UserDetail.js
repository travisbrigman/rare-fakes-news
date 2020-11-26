//displays user information and allows user to subscribe and unsubscribe
import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import defaultImg from "./Images/default.png"
import { Button, Box, Heading, Text, Avatar } from "grommet"
import { SubscriptionContext } from "../Subscriptions/SubscriptionProvider"
import { SubscriptionModal } from "./SubscriptionModal"



export const UserDetail = (props) => {
    const { user, getUserById, getCurrentUser, setUser } = useContext(UserContext)
    const { getSubscriptionByAuthor, unsubscribe, createSubscription } = useContext(SubscriptionContext)

    const [subscription, setSubscription] = useState({})
    const [subscriptions, setSubscriptions] = useState([])
    const [subStatus, setSubStatus] = useState(false) //subscription state set to false

        //state variable and functions that change state of the state variable
        const [open, setOpen] = useState();
        const onOpen = () => setOpen(true);
        const onClose = () => setOpen(undefined);

    useEffect(() => {
        if (props.match.params.hasOwnProperty("userId")) {
            getUserById(parseInt(props.match.params.userId))
            .then(setUser)
            //get the most recent sub OBJECT
            //this determines whether the current user follows the author of the UserDetail page
            .then(() => {
                getSubscriptionByAuthor(parseInt(props.match.params.userId))
                .then(setSubscription)
            })
            } else {
                //get an ARRAY of objects to show how many people follow YOU
                getCurrentUser()
                .then((user) => {
                    setUser(user)
                    getSubscriptionByAuthor(user.id)
                    .then(setSubscriptions)
                })
            }
        }, [])
        
        useEffect(() => {
            if (subscription.ended_on !== null) { 
                setSubStatus(false)
            } else {
                setSubStatus(true)
            }
    },[subscription])

    const changeSubStatus = (subscription) => {
        const authorID = parseInt(props.match.params.userId)
        if(subscription.ended_on === null) { //if end === null, user is still subscribed and can unsubscribe
            unsubscribe(authorID)
            .then(() => {
                
                onOpen()
                // window.alert("You are now UNsubscribed!")
                // props.history.push('/home')
            })
        } else {
            createSubscription({ //user can create a subscription
                author_id: authorID
            })
            .then(() => {
                onOpen()
                // window.alert("You are now subscribed!")
                // props.history.push('/home')
            })
        }
    }

    return (
        <>
        <SubscriptionModal open={open} onClose={onClose} subStatus={subStatus}/>
            <Box>
                {props.match.params.hasOwnProperty("userId") ?
                    <Heading level="1">{user.user.username}'s Profile</Heading> :<Box>
                        <Heading level="1" style={{margin: "2rem 0rem 2rem 0rem"}}>My Profile</Heading>
                        <Text size="large" color="text" weight="bold" textAlign="start" margin="xsmall">{user.user.first_name} {user.user.last_name}</Text>
                        <Box direction="row">
                        <Text color="text" weight="bold" textAlign="start" margin="xsmall">subscribers:</Text> 
                        <Text color="text-weak" textAlign="end" margin="xsmall">{subscriptions.length}</Text>
                        </Box>
                    </Box>}
                {user.user.profile_image_url === "" || user.user.profile_image_url === undefined
                    ? <Avatar size="large" src={defaultImg} alt="default avatar smiley"></Avatar>
                    : <Avatar size="large" src={user.user.profile_image_url} alt="user's avatar"></Avatar>
                }
                <Box direction="row">
                <Text color="text" weight="bold" textAlign="start" margin="xsmall">Username:</Text>
                <Text color="text-weak" textAlign="end" margin="xsmall">{user.user.username}</Text>
                </Box>

                <Box direction="row">
                <Text color="text" weight="bold" textAlign="start" margin="xsmall">email:</Text> 
                <Text color="text-weak" textAlign="end" margin="xsmall">{user.user.email}</Text>
                </Box>
                <Box direction="row">
                <Text color="text" weight="bold" textAlign="start" margin="xsmall" >Creation Date:</Text> 
                <Text color="text-weak" textAlign="end" margin="xsmall">{new Date(user.user.date_joined).toLocaleDateString('en-US')}</Text>
                </Box>
            </Box>
            <Box>
                {props.match.params.hasOwnProperty("userId") ?
                    subStatus ?
                        <Button margin="small" label="unsubscribe!" onClick={() => {
                            changeSubStatus(subscription)
                        }} /> :
                        <Button primary margin="small" label="subscribe" onClick={() => {
                            changeSubStatus(subscription)
                        }}/>
                    : ""
                }
            </Box>
        </>
    )
}



