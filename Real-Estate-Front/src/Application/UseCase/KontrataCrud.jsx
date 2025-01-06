import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KontrataEndPoint } from '../Services/endpoints';
import Cookies from '../Services/cookieUtils.jsx';

const ContractsCrud = () =>{
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
            const response = await axios.get(KontrataEndPoint, {
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
        if (window.confirm("Are you sure to delete this Contract?")) {
            axios.delete(`${KontrataEndPoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('Contract has been deleted');
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
                    <h2>Contracts</h2>
                </div>
    
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Kohezgjatja</th>
                            <th>Type</th>
                            <th>PronaID</th>
                            <th>UserID</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((kontrata) => (
                            <tr key={kontrata.kontrataId}>
                                <td>{kontrata.kontrataId}</td>
                                <td>{kontrata.koheZgjatja}</td>
                                <td>{kontrata.type}</td>
                                <td>{kontrata.pronaID}</td>
                                <td>{kontrata.userID}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handelDelete(kontrata.kontrataId)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Fragment>
        );
    };
    
    export default ContractsCrud;

    





