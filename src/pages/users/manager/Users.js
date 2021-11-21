import React, {useState, useEffect} from "react";
import moreIcon from "../../../assets/tables/moreIcon.svg";

import {
  Col,
  Row,
  Table,
  Button,
  Input,
  Form,
  FormGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  Pagination,
  PaginationItem,
  PaginationLink,
  Label,
  Badge,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget.js";
// import TaskContainer from "./components/TaskContainer/TaskContainer.js";
import UsersApi from "../../../api/user.js";
// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from 'react-bootstrap-table2-paginator  ';
// import MUIDataTable from "mui-datatables";

import s from "./Users.module.scss";

const Users = function (props) {
  const [listUsers, setUsers] = useState([]);
  const [searchListUsers, setSearchListUsers] = useState([]);
  const [checkbox, setCheckbox] = useState(false)
  const [firstTableCurrentPage, setFirstTableCurrentPage] = useState(0);
  const [inputValue, setInputValue] = useState(null);
  const [delleteUser, setDelleteUser] = useState([]);
  const pageSize = 4;
  const firstTablePagesCount = Math.ceil(listUsers.length / pageSize);
  const [tableDropdownOpen, setTableMenuOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.elements.search.value);
    setInputValue(e.target.elements.search.value);
    setUsers(searchListUsers);
  }

  function onSelect(event) {
    event.preventDefault()
    if(checkbox == true) setCheckbox(false);
    setCheckbox(true).then(() => {})
    setDelleteUser(event.target.id)
  }

  const tableMenuOpen = () => {
    setTableMenuOpen(!tableDropdownOpen);
  };

  function handleDelete(e) {
    console.log("123", e.target);
    // setInputValue(e.target.elements.search.value);
    // setUsers(searchListUsers);
  }

  useEffect(() => {
    async function fetchData() {
      let res = await UsersApi.ListUsers();
      console.log(res.data.data);
      res.data.data.rows.forEach((element, index) => (element.key = index));
      setUsers(res.data.data.rows);
      return res;
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let res = await UsersApi.SeachUsers(inputValue);
      console.log(res.data.data);
      res.data.data.rows.forEach((element, index) => (element.key = index));
      setSearchListUsers(res.data.data.rows);
      return res;
    }
    fetchData();
  }, [inputValue]);

  const setFirstTablePage = (e, index) => {
    e.preventDefault();
    setFirstTableCurrentPage(index);
  };

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              <Widget>
                <div className="widget-table-overflow">
                  <Form onSubmit={handleSubmit}>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={2}>
                        Email
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="exampleEmail"
                          name="search"
                          placeholder="with a placeholder"
                          type="text"
                          // onChange={(e) => {
                          //   setInputValue(e.target.value);
                          // }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={2}>
                        Select
                      </Label>
                      <Col sm={10}>
                        <Input id="exampleSelect" name="select" type="select">
                          <option>1</option>
                          <option>2</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup check row>
                      <Col
                        sm={{
                          offset: 2,
                          size: 10,
                        }}
                      >
                        <Button>Submit</Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </div>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">States Colors</div>

                  <div className="d-flex"></div>
                </div>
                <div className="widget-table-overflow">
                  <Table
                    className={`table-striped table-borderless table-hover ${s.statesTable}`}
                    responsive
                  >
                    <thead>
                      <tr>
                        <th className={s.checkboxCol}>
                          <div className="checkbox checkbox-primary">
                            <input
                              className="styled"
                              id="checkbox100"
                              type="checkbox"
                            />
                            <label for="checkbox100" />
                          </div>
                        </th>
                        <th className="w-25">Name</th>
                        <th className="w-25">Email</th>
                        <th className="w-25">Role</th>
                        <th className="w-25">Active</th>
                        <th className="w-25">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listUsers
                        .slice(
                          firstTableCurrentPage * pageSize,
                          (firstTableCurrentPage + 1) * pageSize,
                        )
                        .map((item) => (
                          <tr key={item.id}>
                            <td>
                              <div className="checkbox checkbox-primary">
                                <input defaultChecked={checkbox}
                                  onChange={onSelect}
                                  id={item.id}
                                  className="styled"
                                  type="checkbox"
                                />
                                <Label for={item.id} />
                              </div>
                            </td>
                            <td>
                              <img
                                className={s.image}
                                src={item.avatarImage}
                                alt="User"
                              />
                              <span className="ml-3">{item.firstName}</span>
                            </td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>{item.active.toString().toUpperCase()}</td>
                            <td>
                              <Button color="primary" size="sm">
                                Edit
                              </Button>
                              <Button
                                color="danger"
                                size="sm"
                                onClick={handleDelete}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Pagination
                    className="pagination-borderless"
                    aria-label="Page navigation example"
                  >
                    <PaginationItem disabled={firstTableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={(e) =>
                          setFirstTablePage(e, firstTableCurrentPage - 1)
                        }
                        previous
                        href="#top"
                      />
                    </PaginationItem>
                    {[...Array(firstTablePagesCount)].map((page, i) => (
                      <PaginationItem
                        active={i === firstTableCurrentPage}
                        key={i}
                      >
                        <PaginationLink
                          onClick={(e) => setFirstTablePage(e, i)}
                          href="#top"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem
                      disabled={
                        firstTableCurrentPage >= firstTablePagesCount - 1
                      }
                    >
                      <PaginationLink
                        onClick={(e) =>
                          setFirstTablePage(e, firstTableCurrentPage + 1)
                        }
                        next
                        href="#top"
                      />
                    </PaginationItem>
                  </Pagination>
                </div>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Users;
