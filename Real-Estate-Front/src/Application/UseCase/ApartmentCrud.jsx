import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApartmentEndPoint } from '../Services/endpoints';
import Cookies from '../Services/cookieUtils.jsx';

const ApartmentsCrud = () => {
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [pronaID, setId] = useState('');
    const [emri, setEmri] = useState('');
    const [adresa, setAdresa] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [photo, setPhoto] = useState('');
    const [floor, setFloor] = useState('');
    const [nrDhomave, setNrDhomave] = useState('');
    const [kaAnshensor, setKaAnshensor] = useState(false);

    const [editId, setEditId] = useState('');
    const [editEmri, setEditEmri] = useState('');
    const [editAdresa, setEditAdresa] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editStatus, setEditStatus] = useState('');
    const [editPhoto, setEditPhoto] = useState('');
    const [editFloor, setEditFloor] = useState('');
    const [editNrDhomave, setEditNrDhomave] = useState('');
    const [editKaAnshensor, setEditKaAnshensor] = useState(false);

    const [data, setData] = useState([]);

    const getToken = () => {
        return Cookies.getTokenFromCookies();
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(ApartmentEndPoint, {
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

    async function editFitnesEquipment(apartment) {
        handleShow();

        setEditEmri(apartment.emri);
        setEditAdresa(apartment.adresa);
        setEditPrice(apartment.price);
        setEditDescription(apartment.description);
        setEditStatus(apartment.status);
        setEditPhoto(apartment.photo);
        setEditFloor(apartment.floor);
        setEditNrDhomave(apartment.nrDhomave);
        setEditKaAnshensor(apartment.kaAnshensor);
        setEditId(apartment.pronaID);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.put(`${ApartmentEndPoint}/${editId}`, {
                pronaID: editId,
                emri: editEmri,
                adresa: editAdresa,
                price: editPrice,
                description: editDescription,
                status: editStatus,
                photo: editPhoto,
                floor: editFloor,
                nrDhomave: editNrDhomave,
                kaAnshensor: editKaAnshensor,
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            toast.success('Apartment updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating apartment:", error);
        }
    }
    
    const handelDelete = (id) => {
        if (window.confirm("Are you sure to delete this Apartment?")) {
            axios.delete(`${ApartmentEndPoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('Apartment has been deleted');
                        getData();
                    }
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    };

    const handleSave = () => {
        const data = {
            emri,
            adresa,
            price,
            description,
            status,
            photo,
            floor,
            nrDhomave,
            kaAnshensor,
        };

        axios.post(ApartmentEndPoint, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then(() => {
                getData();
                clear();
                toast.success('Apartment has been added.');
                handleCloseAdd();
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const clear = () => {
        setEmri('');
        setAdresa('');
        setPrice('');
        setDescription('');
        setStatus('');
        setPhoto('');
        setFloor('');
        setNrDhomave('');
        setKaAnshensor(false);

        setEditEmri('');
        setEditAdresa('');
        setEditPrice('');
        setEditDescription('');
        setEditStatus('');
        setEditPhoto('');
        setEditFloor('');
        setEditNrDhomave('');
        setEditKaAnshensor(false);

        setEditId('');
    };

    return (
        <Fragment>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="d-flex justify-content-between align-items-center">
                <h2>Apartments</h2>
                <Button variant="primary" onClick={handleShowAdd}>Add Apartment</Button>
            </div>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Price</th>
                        <th>Floor</th>
                        <th>Rooms</th>
                        <th>Elevator</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((apartment) => (
                        <tr key={apartment.pronaID}>
                            <td>{apartment.pronaID}</td>
                            <td>{apartment.emri}</td>
                            <td>{apartment.adresa}</td>
                            <td>{apartment.price}</td>
                            <td>{apartment.floor}</td>
                            <td>{apartment.nrDhomave}</td>
                            <td>{apartment.kaAnshensor ? "Yes" : "No"}</td>
                            <td>
                                <Button variant="warning" onClick={() => editFitnesEquipment(apartment)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handelDelete(apartment.pronaID)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Add Apartment Modal */}
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Apartment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" placeholder="Name" className="form-control" value={emri} onChange={(e) => setEmri(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="text" placeholder="Address" className="form-control" value={adresa} onChange={(e) => setAdresa(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="number" placeholder="Price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="number" placeholder="Floor" className="form-control" value={floor} onChange={(e) => setFloor(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="number" placeholder="Rooms" className="form-control" value={nrDhomave} onChange={(e) => setNrDhomave(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="checkbox" checked={kaAnshensor} onChange={(e) => setKaAnshensor(e.target.checked)} />
                            Has Elevator
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Apartment Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Apartment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" placeholder="Name" className="form-control" value={editEmri} onChange={(e) => setEditEmri(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="text" placeholder="Address" className="form-control" value={editAdresa} onChange={(e) => setEditAdresa(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="number" placeholder="Price" className="form-control" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="number" placeholder="Floor" className="form-control" value={editFloor} onChange={(e) => setEditFloor(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="number" placeholder="Rooms" className="form-control" value={editNrDhomave} onChange={(e) => setEditNrDhomave(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="checkbox" checked={editKaAnshensor} onChange={(e) => setEditKaAnshensor(e.target.checked)} />
                            Has Elevator
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={update}>Update</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default ApartmentsCrud;
