import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import { saveShippingAddress } from "../slices/cartSlice.js";
import CheckoutSteeps from "../components/CheckoutSteeps.jsx";

function ShippingScreen() {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteeps step1 step2 />

      <h2>Shipping</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="postalCode">
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postalCode"
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
        </Form.Group>

        <Button className="text-light" variant="success" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
