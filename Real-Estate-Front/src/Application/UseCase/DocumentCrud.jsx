import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DocumentEndPoint } from '../Services/endpoints';
import Cookies from '../Services/cookieUtils.jsx';

const DocumentsCrud = () => {
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
                const response = await axios.get(DocumentEndPoint, {
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

    const handelDelete = (id) => {
        if (window.confirm("Are you sure to delete this Document?")) {
            axios.delete(`${DocumentEndPoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('Document has been deleted');
                        getData();
                    }
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    };

    return (
        <Fragment>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="d-flex justify-content-between align-items-center">
                <h2>Documents</h2>
            </div>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>CreatedData</th>
                        <th>ExpiorationDate</th>
                        <th>PronaId</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map((document) => (
                        <tr key={document.documentId}>
                            <td>{document.documentId}</td>
                            <td>{document.type}</td>
                            <td>{document.createdData}</td>
                            <td>{document.expiorationDate}</td>
                            <td>{document.pronaID}</td>
                            <td>
                                <Button variant="danger" onClick={() => handelDelete(document.documentId)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>   
        </Fragment>
    );
};
export default DocumentsCrud;    

        
