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

const BestServicesTable = (props: any) => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [tablePageData, setTablePageData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [pages, setPages] = useState<number[]>([]);
  const pageSize = 3;
  const [pageNumbers, setPageNumbers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axiosBaseURL
      .get("api/services/bestInTown?currentUserProfileId=" + props.props, config)
      .then((response) => {
        setTableData(response?.data);
        setTablePageData(response?.data.slice(0, pageSize));
        setPageNumbers(Math.ceil(response.data.length / pageSize));
        setPages(Array.from(Array((Math.ceil(response.data.length / pageSize))).keys()));
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const changePage = (pageIndex: number) => {
    let startIndex = currentPage;
    let finalIndex = currentPage;
    if(pageIndex > currentPage) {
      startIndex = currentPage * pageSize;
      finalIndex = (currentPage + 1) * pageSize;
    setTablePageData(tableData.slice(startIndex, finalIndex));
    setCurrentPage(pageIndex);
    }
    if(pageIndex < currentPage) {
      startIndex = (currentPage - 2) * pageSize;
      finalIndex = (currentPage - 1) * pageSize;
      setTablePageData(tableData.slice(startIndex, finalIndex));
      setCurrentPage(pageIndex);
      }
  }

  const goToNext = () => {
    const startIndex = currentPage * pageSize;
    const finalIndex = (currentPage + 1) * pageSize;
    setTablePageData(tableData.slice(startIndex, finalIndex));
    setCurrentPage(currentPage + 1);
  }

  const goToPrev = () => {
    const startIndex = (currentPage - 2) * pageSize;
    const finalIndex = (currentPage - 1) * pageSize;
      setTablePageData(tableData.slice(startIndex, finalIndex));
      setCurrentPage(currentPage - 1);
  }

  const goToFirst = () => {
    const startIndex = 0;
    const finalIndex = pageSize;
    setTablePageData(tableData.slice(startIndex, finalIndex));
    setCurrentPage(startIndex + 1);
  }

  const goToLast = () => {
    const startIndex = (pageNumbers - 1) * pageSize;
    const finalIndex = pageSize * pageNumbers;
    setTablePageData(tableData.slice(startIndex, finalIndex));
    setCurrentPage(pageNumbers);
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
          <Pagination.First onClick={goToFirst}/>
          <Pagination.Prev onClick={goToPrev} disabled={currentPage <= 1}/>
          {pages.map((_item, index) => (
            <Pagination.Item active={index + 1 === currentPage}
            onClick={() => changePage(index + 1)} key={index}>{index + 1} </Pagination.Item>
          ))}
          <Pagination.Next onClick={goToNext} disabled={currentPage >= pageNumbers}/>
          <Pagination.Last onClick={goToLast}/>
        </Pagination>
      </div>
    </>
  );
};

export default BestServicesTable;
