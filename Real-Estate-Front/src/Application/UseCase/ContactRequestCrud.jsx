import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactRequestEndPoint } from '../Services/endpoints';
import Cookies from '../Services/cookieUtils.jsx';

const ContactRequestCrud = () => {
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [data, setData] = useState([]);

    const getToken = () => {
        return Cookies.getTokenFromCookies();
    }

    useEffect(() => {
            getData();
        }, []);

        const getData = async () => {
            try {
                const response = await axios.get(ContactRequestEndPoint, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                });
        
                console.log("Response:", response); // Shiko në konsolë të dhënat që merr
                // Sigurohuni që të keni të dhënat e duhura në response.data
                // Nëse backend-i kthen një array të kontratave, kjo mund të jetë OK
                if (response && response.data) {
                    setData(response.data); // Vendos të dhënat në state
                }
            } catch (error) {
                console.log("Error:", error);
                toast.error("There was an error fetching the data.");
            }
        }; 

    return (
        <Fragment>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="d-flex justify-content-between align-items-center">
                <h2>ContactRequests</h2>
            </div>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((contactR) => (
                        <tr key={contactR.id}>
                            <td>{contactR.id}</td>
                            <td>{contactR.name}</td>
                            <td>{contactR.email}</td>
                            <td>{contactR.message}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>  
        </Fragment>
    ); 
};
export default ContactRequestCrud;
