//login page
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Layer,
  TextInput,
} from "grommet";

export const Login = (props) => {
  const [user, setUser] = useState("saoirse@gmail.com");
  const [password, setPassword] = useState("lilbit2019");

  const onPasswordChange = (event) => setPassword(event.target.value);
  const onUserChange = (event) => setUser(event.target.value);

  const [show, setShow] = useState();
  const [showUser, setShowUser] = useState();

  // see if user already exists
  const existingUserCheck = () => {
    const userPass = `${user}:${password}`;
    const encodedUserPass = btoa(userPass);
    return fetch(`http://127.0.0.1:8080/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedUserPass}`,
      },
      // body: JSON.stringify({
      //   username: user.current.value,
      //   password: password.current.value,
      // }),
    })
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        return user !== undefined ? user : false;
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    existingUserCheck().then((exists) => {
      if (!Object.entries(exists).isEmpty) {
        localStorage.setItem("rare_user_id", exists.value);
        props.history.push("/home");
      } else if (Object.entries(exists).isEmpty) {
        setShow(true);
      } else if (!exists) {
        setShowUser(true);
      }
    });
  };

  return (
    <Box direction="column" animation="fadeIn">
      <Box className="container--login">
        {showUser && (
          <Layer>
            <Heading level="3">User does not exist</Heading>
            <Button
              label="Close"
              className="button--close"
              onClick={() => setShowUser(false)}
            />
          </Layer>
        )}
        {show && (
          <Layer>
            <Heading level="3">Password does not match</Heading>
            <Button
              className="button--close"
              label="Close"
              primary
              onClick={() => setShow(false)}
            />
          </Layer>
        )}
      </Box>
      <Box direction="column" alignSelf="center">
        <Heading level="1">Rare</Heading>
        <Heading level="2">Sign In</Heading>
        <Form className="form--login" onSubmit={handleLogin}>
          <FormField label="Email address" htmlFor="inputEmail">
            <TextInput
              value={user}
              onChange={onUserChange}
              type="text"
              id="username"
              placeholder="User Name"
              required
            />
          </FormField>
          <FormField label="Password" htmlFor="inputPassword">
            <TextInput
              value={password}
              onChange={onPasswordChange}
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </FormField>
          <FormField>
            <Box align="center" pad="medium">
              <Button
                size="large"
                label="sign in"
                fill={false}
                margin="small"
                pad="small"
                primary
                type="submit"
              />
            </Box>
          </FormField>
        </Form>
      </Box>
      <Box className="link--register">
        <Anchor
          as={Link}
          to="/register"
          title="register"
          href="/register"
          margin="small"
          justify="center"
        >
          Not a member yet?
        </Anchor>
      </Box>
    </Box>
  );
};
