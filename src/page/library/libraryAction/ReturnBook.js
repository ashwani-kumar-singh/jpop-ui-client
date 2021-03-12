import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import NavBar from '../../../components/nav';
import { LIBRARY_ACTION_BASE_URL, GET_ALL_USER, ASSIGN_BOOK_BASE_URL } from '../../../constants/apiConstants';

const customStyles = {
	control: () => ({
		display: "flex",
		width: 200,
		border: "1px solid black",
		marginRight: "10px",
	}),
}

export default function LibraryPage(props) {
	const [issued, setIssued] = useState([]);
	const [id, setId] = useState(props.match.params.id)
	const [users, setUser] = useState([]);
	const [selectedUser, setSelectedUser] = useState(" ");

	useEffect(() => {
		fetchAllUser();
		// getAllBooksIssued();
	}, [])

	const fetchAllUser = () => {
		axios.get(GET_ALL_USER).then(res => {
			if (res.status === 200) {
				console.log(res.data, 'alluser');
				const users = res.data.responseObject;
				const updatedUser = users.map(user => ({
					...user,
					label: user.email,
					value: user.email
				}))
				setUser([...updatedUser]);
			}
		}).catch(err => {
			console.log(err.response, 'error')
		})
	}


	const getAllBooksIssued = (id) => {
		console.log(id,"idapi");
		axios.get(LIBRARY_ACTION_BASE_URL +`${id}`).then(res => {
			if (res.status === 200) {
				setIssued(res.data.responseObject.issued_books)
			}
			console.log(res, 'devesh')
		}).catch(err => {
			console.log(err, 'error-01')
		})
	}



	const handleChange = (value) => {
		console.log(value.id, "hello");
		setSelectedUser(value.id);
		getAllBooksIssued(value.id);
		
	}

	const deleteBook = (bookId) => {
		axios.delete(ASSIGN_BOOK_BASE_URL + `/${selectedUser}/books/${bookId}`).then(res=>{
			if(res.status === 200){
				const prevList = issued;
				const newList = prevList.filter(book=> book.id !== bookId);
				setIssued([...newList])
			}
			console.log(res, 'deletesuccess')
		})
	}
	
console.log(issued,"issuedbook")
	return (
		<Container fluid>
			<h1>Return Book</h1>
			<div style={{ display: 'flex', width: '100%', paddingBottom: "30px", paddingTop: "40px" }}>
				<Select
					styles={customStyles}
					onChange={(e) => handleChange(e)}
					options={users}
					//onClick={(e)=>setSelectedUser()}
					className="basic-multi-select"
				/>

				{/* <Select
					//value={user}
					// onChange={this.handleChange}
					styles={customStyles}
					options={issued}
				/> */}
			</div>
			
			<div style={{ margin: '40px' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Author</th>
                <th>title</th>
                <th>category</th>
                <th>cost</th>
                <th>total_pages</th>
                <th>published_date</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {issued &&
                issued.map((book, id) => (
                  <tr>
                    <td>{id + 1}</td>
                    <td>{book.author}</td>
                    <td>{book.title}</td>
                    <td>{book.category}</td>
                    <td>{book.cost}</td>
                    <td>{book.total_pages}</td>
                    <td>{book.published_date}</td>
                    <td>
                      <Button variant='danger' onClick={() => deleteBook(book.id)}>return</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
			<div>
			</div>
		</Container>
	);
}