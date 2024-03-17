import { Image, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

import Loader from "./Loader";
import Message from "./Message";
import Rating from "./Rating";

function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message}</Message>
  ) : (
    <Carousel pause="hover" className="mt-1 mb-5">
      {products &&
        products.length > 0 &&
        products.map((product, index) => {
          return (
            <Carousel.Item key={index} className="bg-success">
              <Link to={`/products/${product._id}`}>
                <Image
                  src={product.image}
                  fluid
                  style={{ maxHeight: "470px" }}
                />

                <Carousel.Caption className="carousel-caption">
                  <h3>
                    {product.name}{" "}
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                    <strong className="text-info">(${product.price})</strong>
                  </h3>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
}

export default ProductCarousel;
