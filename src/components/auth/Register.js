//Register form for new user
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Form, FormField, Heading, TextInput } from "grommet";

export const Register = (props) => {
  const userName = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const passwordDialog = useRef();
  const bio = useRef();
  const profileImageUrl = useRef();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password.current.value === confirmPassword.current.value) {
      const newUser = {
        username: userName.current.value,
        password: password.current.value,
        confirmPassword: password.current.value,
        bio: bio.current.value,
        profileImageUrl: profileImageUrl.current.value
      };
      return fetch("https://rare-vapor-server.herokuapp.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newUser), //adds new user to the db
      })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("rare_user_id", res.value);
          props.history.push("/home"); //redirects to home page
        });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <Box fill align="center" justify="center">
      <Box width="medium">
        {/* <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog> */}
        <Form className="form--login" onSubmit={handleRegister}>
          <Heading level="1" className="h3 mb-3 font-weight-normal">
            Register an account
          </Heading>
          <FormField>
            {/* <label htmlFor="userName"> Username </label> */}
            <TextInput
              ref={userName}
              type="text"
              name="userName"
              className="form-control"
              placeholder="display name"
            />
          </FormField>
          <FormField>
            {/* <label htmlFor="inputEmail"> Email Address</label> */}
            <TextInput
              ref={profileImageUrl}
              type="test"
              name="profileImage"
              className="form-control"
              placeholder="image url"
              required
            />
          </FormField>
          <FormField>
            {/* <label htmlFor="inputPassword"> Password </label> */}
            <TextInput
              ref={password}
              type="password"
              name="password"
              className="form-control"
              placeholder="password"
              required
            />
          </FormField>
          <FormField>
            {/* <label htmlFor="confirmPassword"> Verify Password </label> */}
            <TextInput
              ref={confirmPassword}
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="re-enter password"
              required
            />
          </FormField>
          <FormField>
            {/* <label htmlFor="bio"> Short Bio </label> */}
            <TextInput
              ref={bio}
              type="text"
              name="bio"
              className="form-control"
              placeholder="A short bio about yourself"
              required
            />
          </FormField>
          <FormField>
            <Button
              className="btn btn-1 btn-sep icon-send"
              type="submit"
              primary
            >
              Register
            </Button>
          </FormField>
        </Form>
        <Box className="link--register">
          <Box>Already Registered?</Box>
          <Link to="/login">Login</Link>
        </Box>
      </Box>
    </Box>
  );
};
