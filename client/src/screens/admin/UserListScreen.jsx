import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaTimes, FaCheck, FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";

function UserListScreen() {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (userId) => {
    if (window.confirm("Are you use you want to delete a user")) {
      try {
        await deleteUser(userId);
        toast.success("User deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <h3>Users</h3>

      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table striped responsive hover>
          <thead>
            <tr style={{ color: "#00008B" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>

                    <td>
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>

                    <td>
                      <LinkContainer
                        style={{ cursor: "pointer", marginRight: "20px" }}
                        to={`/admin/users/${user._id}/edit`}
                      >
                        <Button variant="light" size="sm">
                          <FaEdit style={{ color: "yellowgreen" }} size={20} />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaRegTrashCan style={{ color: "red" }} size={20} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default UserListScreen;
