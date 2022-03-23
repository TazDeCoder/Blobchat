import { useState } from "react";

import { useForm, Controller } from "react-hook-form";

import { Link as RouterLink } from "react-router-dom";

import { doc, setDoc } from "firebase/firestore";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { db, auth } from "../../../firebase";

import {
  Container,
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Link,
} from "@mui/material";

import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPasswordHandler = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    control,
    trigger,
    setError,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password, username }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", user.uid), {
        username,
        isOnline: true,
      });
    } catch (err) {
      setError("email", {
        type: "server",
        message: "Email already in use!",
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircle />
        </Avatar>

        <Typography component="h1" variant="h5">
          Create an account
        </Typography>

        <Box sx={{ mt: 1 }} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState: { isTouched, invalid, error } }) => (
              <TextField
                id="username"
                label="Username"
                autoComplete="username"
                margin="normal"
                fullWidth
                required
                autoFocus
                {...field}
                error={isTouched && invalid}
                helperText={isTouched && error?.message}
                onBlur={async () => await trigger(["username"])}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Username must not be empty",
              },
              pattern: {
                value: /^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{1,15}$/,
                message: "Username must be Alphanumeric",
              },
            }}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { isTouched, invalid, error } }) => (
              <TextField
                id="email"
                label="Email Address"
                autoComplete="email"
                margin="normal"
                fullWidth
                required
                {...field}
                error={isTouched && invalid}
                helperText={isTouched && error?.message}
                onBlur={async () => await trigger(["email"])}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Email must not be empty",
              },
              pattern: {
                value:
                  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                message: "Email must be valid",
              },
            }}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { isTouched, invalid, error } }) => (
              <TextField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                margin="normal"
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPasswordHandler}
                        onMouseDown={toggleShowPasswordHandler}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...field}
                error={isTouched && invalid}
                helperText={isTouched && error?.message}
                onBlur={async () => await trigger(["password"])}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Password must not be empty",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              maxLength: {
                value: 32,
                message: "Password must be within 32 characters long",
              },
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,32}$/gm,
                message:
                  "Password must contain a uppercase letter, a lowercase letter, a numeric character, and a special character",
              },
            }}
          />

          <Button
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isValid}
          >
            Sign Up
          </Button>

          <Link component={RouterLink} to="/auth/signin" variant="body2">
            Already have an account? Sign In
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
