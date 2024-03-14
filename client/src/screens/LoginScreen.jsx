import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Form, Button, Row, Col } from "react-bootstrap";
import { setCredentials } from "../slices/authSlice";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
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
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate(redirect);
    } catch (error) {
      toast(error?.data || error.error);
    }
  };

  return (
    <FormContainer>
      <h2>Sign In</h2>

      <Form onSubmit={submitHandler}>
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
              placeholder="Please enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button
          type="submit"
          variant="success"
          className="mt-3"
          disabled={isLoading}
        >
          Sign In
        </Button>
        <div>
          <h3>{userInfo?.email}</h3>
        </div>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          Don't have an account yet? {"   "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Let's Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
