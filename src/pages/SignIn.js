import { useContext, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

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

import {
  LockOutlined as LockOutlinedIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

import AuthContext from "../store/auth-context";

function SignIn() {
  const auth = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPasswordHandler = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const { control, setError, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = ({ email, password }) => {
    auth.onSignIn(email, password).catch(() => {
      setError("email", {
        type: "server",
        message: "Email doesn't exist!",
      });
    });
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
          <LockOutlinedIcon />
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
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...field}
                error={invalid}
                helperText={error?.message}
              />
            )}
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
