import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { MdModeEditOutline, MdDeleteForever } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";

// Components
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";

function ProductListScreen() {
  const { pageNumber } = useParams();
  const { data, refetch, isLoading, error } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you use you want to create a new product")) {
      try {
        await createProduct();
        refetch();
        toast.success("Product created successfully");
      } catch (error) {
        toast.error(error.data?.message || error.message);
      }
    }
  };

  const deleteProductHandler = async (productId) => {
    if (window.confirm("Are you use you want to delete a product")) {
      try {
        await deleteProduct(productId).unwrap();
        toast.success("Product deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error.data?.message || error.message);
      }
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h3>Products</h3>
        </Col>

        <Col className="text-end">
          <Button onClick={createProductHandler}>
            <FaPlus className="mx-1" /> Create product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : data.products && data.products.length > 0 ? (
        <Table striped responsive hover className="my-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.products &&
              data.products.length > 0 &&
              data.products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer
                        style={{ cursor: "pointer", marginRight: "20px" }}
                        to={`/admin/products/${product._id}/edit`}
                      >
                        <Button size="sm">
                          <MdModeEditOutline
                            style={{ color: "yellow" }}
                            size={22}
                          />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteProductHandler(product._id)}
                      >
                        <MdDeleteForever style={{ color: "white" }} size={22} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      ) : (
        <Message>There is no any product</Message>
      )}

      <Paginate pages={data?.pages} page={data?.page} isAdmin={true} />
    </>
  );
}

export default ProductListScreen;
