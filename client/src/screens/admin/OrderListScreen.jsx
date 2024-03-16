import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { LiaTimesSolid } from "react-icons/lia";

function OrderListScreen() {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();

  return (
    <>
      <h3>All Orders</h3>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : orders && orders.length > 0 ? (
        <Table striped responsive hover variant="light">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.length > 0 &&
              orders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{order._id}</td>
                    <td>{order.user?.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <LiaTimesSolid style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <LiaTimesSolid style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="success">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      ) : (
        <Message>There is no any order</Message>
      )}
    </>
  );
}

export default OrderListScreen;
