import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import Product from "./Product";
import { addToCart, removeFromCart } from "../slices/cartSlice";

function CartScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const removeCartHandler = async (product) => {
    dispatch(removeFromCart({ ...product }));
  };

  return (
    <Row>
      <Col md={8}>
        <h2 style={{ marginBottom: "18px" }}>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Let's go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={3}>
                    <Image src={item.image} alt={item.name} rounded fluid />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>

                  <Col md={2} className="text-danger">
                    ${item.price}
                  </Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button
                      variant="light"
                      onClick={() => removeCartHandler(item)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                {cartItems.reduce((acc, item) => acc + item.qty, 0) >= 2
                  ? " items"
                  : " item"}
              </h2>
              <span className="text-danger">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.qty, 0)
                  .toFixed(2)}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                variant="success"
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
