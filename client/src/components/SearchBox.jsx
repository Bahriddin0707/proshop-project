import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function SearchBox() {
  const { keyword: urlKeyword } = useParams();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const searchHandler = async (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <Form
      onSubmit={searchHandler}
      className="d-flex gap-2"
      style={{ marginRight: "20px" }}
    >
      <Form.Group controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Form.Group>

      <Button
        type="submit"
        variant="outline-success"
        className="my-auto text-light"
      >
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
