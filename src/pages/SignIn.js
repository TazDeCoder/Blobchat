import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

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

import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

import { signInUser } from "../store/auth/auth-actions";

function SignIn() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);
  const authenticated = useSelector((state) => state.auth.authenticated);

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (error) {
      const [type, code] = error.split("/");
      switch (code) {
        case "user-not-found": {
          return setError("email", {
            type,
            message: "Email doesn't exist!",
          });
        }
        case "wrong-password": {
          return setError("password", {
            type,
            message: "Password is incorrect!",
          });
        }
        default: {
          return;
        }
      }
    }
  }, [error, setError]);

  const toggleShowPasswordHandler = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = ({ email, password }) => {
    if (Object.keys(errors).length > 0) return;
    dispatch(signInUser(email, password));
    setTimeout(() => {
      if (authenticated || !error) navigate("/home");
    }, 1000);
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
          <LockOutlined />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box
          sx={{ mt: 1 }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                id="email"
                label="Email Address"
                autoComplete="email"
                margin="normal"
                fullWidth
                required
                autoFocus
                {...field}
                error={invalid}
                helperText={error?.message}
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
            render={({ field, fieldState: { invalid, error } }) => (
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
                error={invalid}
                helperText={error?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Password must not be empty",
              },
            }}
          />

          <Button
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            variant="contained"
            fullWidth
          >
            Sign In
          </Button>

          <Link component={RouterLink} to="/auth/signup" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
