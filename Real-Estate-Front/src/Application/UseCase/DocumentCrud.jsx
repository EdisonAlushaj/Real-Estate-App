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
    
    const [documentId, setDocumentId] = useState('');
    const [type, setType] = useState('');
    const [createdData, setCreatedData] = useState('');
    const [expiorationDate, setExpiorationDate] = useState('');

    const [editDocumentId, setEditDocumentId] = useState('');
    const [editType, setEditType] = useState('');
    const [editCreatedData, setEditCreatedData] = useState('');
    const [editExpiorationDate, setEditExpiorationDate] = useState('');

    const [data, setData] = useState([]);

    const getToken = () => {
        return Cookies.getTokenFromCookies();
    }

    useEffect(() => {
            getData();
        }, []);

    const getData = () => {
        axios.get(DocumentEndPoint, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((response) => {
                console.log(response);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
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

    const clear = () => {
        setType('');
        setCreatedData('');
        setExpiorationDate('');
        
        setEditType('');
        setEditCreatedData('');
        setEditExpiorationDate('');

        setEditDocumentId('');
    };

    return (
        <Fragment>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="d-flex justify-content-between align-items-center">
                <h2>Contracts</h2>
                <Button variant="primary" onClick={handleShowAdd}>Add Contract</Button>
            </div>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>CreatedData</th>
                        <th>ExpiorationDate</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map((document) => (
                        <tr key={document.documentId}>
                            <td>{document.documentId}</td>
                            <td>{document.type}</td>
                            <td>{document.createdData}</td>
                            <td>{document.expiorationDate}</td>
                            <td>
                                <Button variant="danger" onClick={() => handelDelete(document.documentId)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" placeholder="Type" className="form-control" value={type} onChange={(e) => setType(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="text" placeholder="CreatedData" className="form-control" value={createdData} onChange={(e) => setCreatedData(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="number" placeholder="ExpiorationDate" className="form-control" value={expiorationDate} onChange={(e) => setExpiorationDate(e.target.value)} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>    
        </Fragment>
    );
};
export default DocumentsCrud;    

        
