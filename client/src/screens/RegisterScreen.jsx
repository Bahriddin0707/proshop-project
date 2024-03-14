import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Form, Button, Row, Col } from "react-bootstrap";
import { setCredentials } from "../slices/authSlice";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    try {
      const response = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate(redirect);
    } catch (error) {
      console.log(error);
      toast(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h2>Sign Up</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Col>
            <Form.Control
              type="password"
              value={password}
              placeholder="Please enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Password confirmation</Form.Label>
          <Col>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Please enter the password again"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button
          type="submit"
          variant="success"
          className="mt-2"
          disabled={isLoading}
        >
          Sign Up
        </Button>
        <div>
          <h3>{userInfo?.email}</h3>
        </div>

        {isLoading && <Loader />}
      </Form>

      <Row className="pt-2">
        <Col>
          Already have an account? {"   "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Let's Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
