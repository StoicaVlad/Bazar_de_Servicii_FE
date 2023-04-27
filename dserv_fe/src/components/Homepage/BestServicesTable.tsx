import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axiosBaseURL from "../HttpCommon";
import "../../style.css";
import { InputGroup, Form, Pagination } from "react-bootstrap";

let config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

const BestServicesTable = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [tablePageData, setTablePageData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [pages, setPages] = useState<number[]>([]);
  const pageSize = 1;
  let pageNumbers = -1;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axiosBaseURL
      .get("api/services/show", config)
      .then((response) => {
        console.log(response.data);
        setTableData(response?.data);
        setTablePageData(response?.data.slice(0, pageSize));
        console.log(tableData);
        pageNumbers = Math.trunc(response.data.length / pageSize);
        setPages(Array.from(Array(pageNumbers).keys()));
        console.log("pageNumbers", pageNumbers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const nextPage = (pageIndex: number) => {
    console.log(pageIndex, currentPage);
    if(pageIndex > currentPage) {
    setTablePageData(tableData.splice(currentPage * pageSize, (currentPage + 1) * pageSize));
    setCurrentPage(pageIndex);
    }
    if(pageIndex < currentPage) {
      setTablePageData(tableData.splice((currentPage - 1) * pageSize, currentPage * pageSize));
      setCurrentPage(pageIndex);
      }
  }

  const tableDataSearchFilter = tablePageData
    .filter((item) => {
      return searchText.toLowerCase() === ""
        ? item
        : item.title.toLowerCase().includes(searchText);
    })
    .map((item, index) => (
      <tr key={index}>
        <td>{item.title}</td>
        <td>{item.category}</td>
        <td>{item.owner}</td>
        <td>{item.price + " " + item.currency}</td>
      </tr>
    ));
  return (
    <>
      <div>
        <Form>
          <InputGroup className="my-3, table">
            <Form.Control
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by title"
            ></Form.Control>
          </InputGroup>
        </Form>
      </div>
      <div className="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Owner</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{tableDataSearchFilter}</tbody>
        </Table>
      </div>
      <div className="table" style={{ textAlign: "left" }}>
        {"Page size: " + pageSize}
      </div>
      <div className="table">
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          {pages.map((item, index) => (
            <Pagination.Item onClick={() => nextPage(index + 1)} key={index}>{index + 1} </Pagination.Item>
          ))}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </>
  );
};

export default BestServicesTable;
