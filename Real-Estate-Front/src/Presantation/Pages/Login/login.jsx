import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';

function Login() {
  const [username, setUsername] = useState(''); // Use username instead of email
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // For navigating after successful login

  const handleUsernameChange = (event) => {
    setUsername(event.target.value); // Set the username
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const GetLoginDetails = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    setLoading(true);
    setErrorMessage(''); // Clear previous error

    try {
      // Sending username and password to the correct endpoint
      const response = await axios.post('https://localhost:7140/api/Account/login', {
        username: username,  // Replace email with username
        password: password,
      });

      // Check if response contains expected data (e.g., token or user info)
      console.log('Login successful:', response.data);

      // Assuming the response contains a token or user data
      if (response.data.token) {
        // Save token or user data if needed, e.g.:
        localStorage.setItem('token', response.data.token);  // Save token for future requests
      }

      // Navigate to another page after successful login
      navigate('/app/home');  // Redirect to the home page or dashboard

    } catch (error) {
      // Handle errors with more specific messages
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage('Invalid username or password.');
        } else {
          setErrorMessage('Failed to login: ' + error.response.data.message || 'Unknown error');
        }
      } else if (error.request) {
        setErrorMessage('Failed to login: No response from the server.');
      } else {
        setErrorMessage('Failed to login: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your username and password!</p>

              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Username'  // Change label to "Username"
                id='username'    // Change id to "username"
                type='text'
                size="lg"
                value={username}
                onChange={handleUsernameChange}
              />
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Password'
                id='password'
                type='password'
                size="lg"
                value={password}
                onChange={handlePasswordChange}
              />

              <p className="small mb-3 pb-lg-2">
                <a className="text-white-50" href="#!">Forgot password?</a>
              </p>
              <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={GetLoginDetails} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </MDBBtn>

              {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg" />
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">Don't have an account? <NavLink to="/register" className="text-white-50 fw-bold">Sign Up</NavLink></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
