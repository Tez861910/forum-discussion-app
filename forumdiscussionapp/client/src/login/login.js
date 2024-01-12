import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  Stack,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "../start/logo.png";
import { useApi } from "../home-page/Api";

export const Login = () => {
  const [values, setValues] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token", "refreshToken"]);
  const theme = useTheme();
  const { api } = useApi();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleLoginSuccess = async (data) => {
    // Store the tokens in cookies
    setCookie("token", data.token);
    setCookie("refreshToken", data.refreshToken);

    // Set local storage data as needed
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("roleId", data.roleId);

    // Navigate to the home page or another route as needed
    navigate("/home");
  };

  const refreshAccessToken = async () => {
    try {
      const response = await api.post("/miscs/refreshtokens/refresh-token", {
        token: cookies.refreshToken,
      });

      // Update the access token in the cookie
      setCookie("token", response.data.accessToken);
    } catch (refreshError) {
      console.error("Error refreshing access token:", refreshError);

      if (refreshError.response) {
        const status = refreshError.response.status;

        if (status === 403) {
          // Redirect the user to the login page
          navigate("/login");
        } else {
          setError(`Error refreshing access token: ${status}`);
        }
      } else {
        setError("Error refreshing access token. Please try again.");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/auth/login/login", {
        email: values.email,
        password: values.password,
      });

      if (response.data.success) {
        handleLoginSuccess(response.data);
      } else {
        setError("Login failed. Please check your email and password.");
      }
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.error || "Login failed. Please try again."
        );
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          opacity: 0.9,
          transition: "opacity .3s",
          "&:hover": { opacity: 1 },
        }}
      >
        <Stack spacing={3} justifyContent="center" alignItems="center">
          <Avatar
            src={logo}
            alt="Logo"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography
            component="h2"
            variant="h3"
            sx={{ color: theme.palette.primary.main, mb: 2 }}
          >
            Sign-In
          </Typography>
          {error && (
            <Box sx={{ color: theme.palette.error.main, mb: 2 }}>{error}</Box>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={0.1}>
              {["email", "password"].map((field) => (
                <Grid item xs={12} key={field}>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    id={field}
                    label={field === "email" ? "Email" : "Password"}
                    type={field === "email" ? "email" : "password"}
                    placeholder={`Enter ${
                      field === "email" ? "Email" : "Password"
                    }`}
                    name={field}
                    autoComplete={
                      field === "email" ? "email" : "current-password"
                    }
                    value={values[field]}
                    onChange={handleInput}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, opacity: 0.8 }}
                >
                  Log in
                </Button>
              </Grid>
            </Grid>
            <Typography variant="body2" sx={{ mt: 2 }}>
              You agree to our terms and conditions
            </Typography>
            <Link
              to="/sign-up"
              variant="body2"
              sx={{ mt: 2, display: "block" }}
            >
              Create Account
            </Link>
          </form>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ mt: 2, mb: 2, opacity: 0.8 }}
            onClick={() => navigate("/")}
          >
            Go back to start
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};
