import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import cookieUtils from '../../../Application/Services/cookieUtils'; // Import cookieUtils
import { PronaEndPoint } from '../../../Application/Services/endpoints';
import coverImg from '../../../../public/Image/property-1.png';

import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';

function PropertyDetails() {
    const { id } = useParams(); // ID-ja e pronës nga parametri i URL-së
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    // Merr detajet e pronës
    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`${PronaEndPoint}/GetPropertyDetails`, { params: { id } });
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property details:', error);
                alert('There was an error fetching property details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    // Funksioni për blerjen e pronës
    const handleBuyProperty = async () => {
        const userId = cookieUtils.getUserIdFromCookies(); // Merrni userId nga cookies
        const token = cookieUtils.getTokenFromCookies(); // Merrni token-in nga cookies
        const duration = 12; // Koha e zgjedhjes në muaj
    
        if (!token || !userId) {
            alert('User is not authenticated. Please log in.');
            return;
        }
    
        try {
            const response = await axios.post(
                `https://localhost:7140/api/Sells`,
                {
                    userId,
                    pronaId: id,
                    koheZgjatja: duration,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Property purchased successfully!');
            navigate('/my-properties'); // Navigo te faqja e pronave të blera
        } catch (error) {
            console.error('Error purchasing property:', error);
            alert(`Error: ${error.response?.data || error.message}`);
        }
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
                                onClick={handleBuyProperty}
                            >
                                Buy Property
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PropertyDetails;
