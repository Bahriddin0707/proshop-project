import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
  const { data: products, error, isLoading } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h2>Latest Products</h2>
          <Row>
            {products.map((product, index) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

export default HomeScreen;
