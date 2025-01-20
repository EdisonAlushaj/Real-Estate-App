import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import cookieUtils from '../../../Application/Services/cookieUtils';
import { PronaEndPoint, SellEndPoint } from '../../../Application/Services/endpoints';
import coverImg from '../../../../public/Image/property-1.png';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

function PropertyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saleDate, setSaleDate] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            const token = cookieUtils.getTokenFromCookies(); 
            try {
                const response = await axios.get(`${PronaEndPoint}/GetPropertyDetails`, {
                    params: { id },
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                setProperty(response.data);
                setSalePrice(response.data.price); 
            } catch (error) {
                console.error('Error fetching property details:', error);
                toast.error('Error fetching property details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchPropertyDetails();
    }, [id]);

    const handleBuyProperty = async () => {
        const token = cookieUtils.getTokenFromCookies();
        const userId = cookieUtils.getUserIdFromCookies();
        const saleData = {
            userId: userId,
            pronaId: id,
            saleDate: saleDate,
            salePrice: salePrice,
            paymentMethod: paymentMethod
        };

        const url = `https://localhost:7140/api/Sells?userId=${saleData.userId}&pronaId=${saleData.pronaId}&saleDate=${saleData.saleDate}&salePrice=${saleData.salePrice}&paymentMethod=${saleData.paymentMethod}`;

        try {
            const response = await axios.post(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Sale created successfully:', response.data);
            toast.success('Property purchase successful!'); 
            setTimeout(() => {
                navigate('/app/property');
            }, 1000);
        } catch (error) {
            console.error('Error creating sale:', error.response?.data || error.message);
            toast.error('Error purchasing property. Please try again later.');
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    if (loading) {
        return <p>Loading property details...</p>;
    }

    if (!property) {
        return <p>Property not found.</p>;
    }

    return (
        <div>
            <Header />
            <ToastContainer position="top-right" autoClose={5000} />
            <div style={{ padding: '6em 0 0', backgroundColor: '#f4f4f9' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2em' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '3em', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <img
                                src={property.imageUrl || coverImg}
                                alt={property.emri}
                                style={{
                                    width: '100%',
                                    height: '500px',
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: '2.5em', fontWeight: 'bold', marginBottom: '0.5em' }}>{property.emri}</h1>
                            <p style={{ fontSize: '1.2em', color: '#555', marginBottom: '1em' }}>{property.adresa}</p>
                            <p style={{ fontSize: '1.1em', lineHeight: '1.6em' }}>{property.description}</p>
                            <div style={{ marginTop: '1.5em' }}>
                                <p style={{ fontSize: '1.3em', fontWeight: 'bold' }}>Price: ${property.price}</p>
                                <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Size: {property.size} sqft</p>
                                <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Rooms: {property.rooms}</p>
                                <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Type: {property.type}</p>
                            </div>

                            <button
                                style={{
                                    marginTop: '2em',
                                    padding: '0.8em 2em',
                                    fontSize: '1.1em',
                                    color: '#fff',
                                    backgroundColor: '#007bff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setShowForm(true)}
                            >
                                Buy Property
                            </button>

                            {showForm && (
                                <div style={{ marginTop: '2em' }}>
                                    <input
                                        type="date"
                                        value={saleDate}
                                        onChange={(e) => setSaleDate(e.target.value)}
                                        style={{ marginBottom: '1em', padding: '0.5em', width: '100%' }}
                                    />
                                    <input
                                        type="text"
                                        value={salePrice}
                                        placeholder="Sale Price"
                                        style={{ marginBottom: '1em', padding: '0.5em', width: '100%' }}
                                    />
                                    <select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        style={{ marginBottom: '1em', padding: '0.5em', width: '100%' }}
                                    >
                                        <option value="card">Card</option>
                                        <option value="cash">Cash</option>
                                    </select>
                                    <button
                                        onClick={handleBuyProperty}
                                        style={{
                                            padding: '0.8em 2em',
                                            fontSize: '1.1em',
                                            color: '#fff',
                                            backgroundColor: '#28a745',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Confirm Purchase
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PropertyDetails;
