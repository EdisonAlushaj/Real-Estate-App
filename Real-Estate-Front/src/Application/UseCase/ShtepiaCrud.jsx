import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShtepiaEndPoint } from '../Services/endpoints';

const ShtepiaCrud = () => {
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [pronaID, setPronaID] = useState('');
    const [emri, setEmri] = useState('');
    const [adresa, setAdresa] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [size, setSize] = useState('');
    const [nrFloors, setNrFloors] = useState('');
    const [kaGarazhd, setKaGarazhd] = useState(false);
    const [kaPool, setKaPool] = useState(false);

    const [editId, setEditId] = useState('');
    const [editEmri, setEditEmri] = useState('');
    const [editAdresa, setEditAdresa] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editStatus, setEditStatus] = useState('');
    const [editSize, setEditSize] = useState('');
    const [editNrFloors, setEditNrFloors] = useState('');
    const [editKaGarazhd, setEditKaGarazhd] = useState(false);
    const [editKaPool, setEditKaPool] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(ShtepiaEndPoint)
            .then((response) => {
                console.log(response);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    async function editHouse(toka) {
        handleShow();
        setEditEmri(toka.emri);
        setEditAdresa(toka.adresa);
        setEditPrice(toka.price);
        setEditDescription(toka.description);
        setEditStatus(toka.status);
        setEditSize(toka.size);
        setEditNrFloors(toka.nrFloors);
        setEditKaGarazhd(toka.kaGarazhd);
        setEditKaPool(toka.kaPool);
        setEditId(toka.pronaID);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.put(`${ShtepiaEndPoint}/${editId}`, {
                pronaID: editId,
                emri: editEmri,
                adresa: editAdresa,
                price: editPrice,
                description: editDescription,
                status: editStatus,
                size: editSize,
                nrFloors: editNrFloors,
                kaGarazhd: editKaGarazhd,
                kaPool: editKaPool
            });
            toast.success('House updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating land:", error);
        }
    }

    const handelDelete = (id) => {
        if (window.confirm("Are you sure to delete this house?")) {
            axios.delete(`${ShtepiaEndPoint}/${id}`)
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('House has been deleted');
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
            size,
            nrFloors,
            kaGarazhd,
            kaPool
        };

        axios.post(ShtepiaEndPoint, data)
            .then(() => {
                getData();
                clear();
                toast.success('House has been added.');
                handleCloseAdd();
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const clear = () => {
        setEmri('');
        setAdresa('');
        setPrice();
        setDescription('');
        setStatus('');
        setSize();
        setNrFloors();
        setKaGarazhd(false);
        setKaPool(false);

        setEditEmri('');
        setEditAdresa('');
        setEditPrice();
        setEditDescription('');
        setEditStatus('');
        setEditSize();
        setEditNrFloors();
        setEditKaGarazhd(false);
        setEditKaPool(false);

        setEditId('');
    };

    return (
        <Fragment>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="d-flex justify-content-between align-items-center">
                <h2>House</h2>
                <Button variant="primary" onClick={handleShowAdd}>Add House</Button>
            </div>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Prona ID</th>
                        <th>Emri</th>
                        <th>Adresa</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Size</th>
                        <th>Nr Floors</th>
                        <th>Garage</th>
                        <th>Pool</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((house) => (
                        <tr key={house.pronaID}>
                            <td>{house.pronaID}</td>
                            <td>{house.emri}</td>
                            <td>{house.adresa}</td>
                            <td>{house.price}</td>
                            <td>{house.description}</td>
                            <td>{house.status}</td>
                            <td>{house.size}</td>
                            <td>{house.nrFloors}</td>
                            <td>{house.kaGarazhd ? "Yes" : "No"}</td>
                            <td>{house.kaPool ? "Yes" : "No"}</td>
                            <td>
                                <Button variant="warning" onClick={() => editHouse(house)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handelDelete(house.pronaID)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Add Land Modal */}
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add House</Modal.Title>
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
                            <input type="text" placeholder="Description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="number" placeholder="Size" className="form-control" value={size} onChange={(e) => setSize(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="number" placeholder="Nr Floors" className="form-control" value={nrFloors} onChange={(e) => setNrFloors(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="text" placeholder="Status" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="checkbox" checked={kaGarazhd} onChange={(e) => setKaGarazhd(e.target.checked)} />
                            Has Garage
                        </Col>
                        <Col>
                            <input type="checkbox" checked={kaPool} onChange={(e) => setKaPool(e.target.checked)} />
                            Has Pool
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Land Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit House</Modal.Title>
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
                            <input type="text" placeholder="Description" className="form-control" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="number" placeholder="Size" className="form-control" value={editSize} onChange={(e) => setEditSize(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="number" placeholder="Nr Floors" className="form-control" value={editNrFloors} onChange={(e) => setEditNrFloors(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="text" placeholder="Status" className="form-control" value={editStatus} onChange={(e) => setEditStatus(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="checkbox" checked={editKaGarazhd} onChange={(e) => setEditKaGarazhd(e.target.checked)} />
                            Has Garage
                        </Col>
                        <Col>
                            <input type="checkbox" checked={editKaPool} onChange={(e) => setEditKaPool(e.target.checked)} />
                            Has Pool
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

export default ShtepiaCrud;