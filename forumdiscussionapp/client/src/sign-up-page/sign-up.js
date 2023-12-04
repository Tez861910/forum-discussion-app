import * as React from 'react';
import axios from 'axios';
import RoleDropdown from './role-dropdown';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button, Stack, Box, Paper } from '@mui/material';
import SignUpValidation from './sign-up-validation';

const Signup = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    roleId: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({});
  const [successMessage, setSuccessMessage] = React.useState([]);
  const [roles, setRoles] = React.useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const fetchData = async () => {
    try {
      const rolesResponse = await axios.get('http://localhost:8081/roles/roles/get');
      const rolesData = rolesResponse.data.roles;
      setRoles(rolesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = SignUpValidation(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8081/signup/signup', formData);

        if (response.status === 200) {
          console.log('Signup successful');
          setSuccessMessage(['Signup successful']);
          navigate('/login');
          setFormData({
            name: '',
            email: '',
            password: '',
            roleId: '',
          });
        } else {
          console.error('Signup failed. Status:', response.status);
          setErrors({ _error: 'Signup failed. Please try again.' });
        }
      } catch (error) {
        console.error('Error signing up user:', error);
        setErrors({ _error: 'Signup failed. Please try again.' });
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: 'background.paper', borderRadius: 2 }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Sign-Up
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="User Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
                sx={{ '.MuiInputBase-input': { fontSize: '1rem' } }}
              />

              <TextField
                fullWidth
                label="User Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                sx={{ '.MuiInputBase-input': { fontSize: '1rem' } }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                sx={{ '.MuiInputBase-input': { fontSize: '1rem' } }}
              />

              <RoleDropdown
                name="roleId"
                value={formData.roleId}
                onChange={handleInputChange}
                roles={roles}
                error={!!errors.roleId}
                helperText={errors.roleId}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouterLink to="/login">
                    Already have an account? Sign in
                  </RouterLink>
                </Grid>
              </Grid>

              <Grid container justifyContent="flex-end">
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => navigate('/')}
                >
                  Go back to start
                </Button>
              </Grid>
            </form>
          </Grid>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Signup;
