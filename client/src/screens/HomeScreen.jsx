import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link, useParams } from "react-router-dom";

// Components
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

function HomeScreen() {
  const { pageNumber, keyword } = useParams();
  const { data, error, isLoading } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  return (
    <>
      {keyword ? (
        <Link to="/" className="btn btn-light mb-2">
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {!keyword && <h2>Latest Products</h2>}
          <Row>
            {data.products &&
              data.products.length > 0 &&
              data.products.map((product, index) => (
                <Col sm={12} md={6} lg={4} xl={3} key={index}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>

          <Paginate
            pages={data?.pages}
            page={data?.page}
            keyword={keyword || ""}
          />
        </>
      )}
    </>
  );
}

export default HomeScreen;
