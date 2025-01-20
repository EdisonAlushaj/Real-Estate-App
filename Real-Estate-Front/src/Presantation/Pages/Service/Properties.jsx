import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PronaEndPoint } from '../../../Application/Services/endpoints';
import './Service.css';
import { useNavigate } from 'react-router-dom';

function Properties() {
    const [allProperties, setAllProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [budget, setBudget] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const navigate = useNavigate();

    const BASE_URL = "https://localhost:7140";

    const formatPhotoUrl = (photoPath) => `${BASE_URL}/${photoPath.replace(/\\/g, '/')}`;


    useEffect(() => {
        const fetchAllProperties = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${PronaEndPoint}/GetAll`);
                setAllProperties(response.data);
                setFilteredProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProperties();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        setHasSearched(true);

        if (!location && !category && !budget && !propertyType) {
            setFilteredProperties(allProperties);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${PronaEndPoint}/GetFilteredProperties`, {
                params: {
                    location,
                    category,
                    maxPrice: budget || undefined,
                    propertyType,
                },
            });

            setFilteredProperties(response.data);
        } catch (error) {
            console.error('Error filtering properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShowAllProperties = () => {
        setFilteredProperties(allProperties);
        setHasSearched(false);
        setLocation('');
        setCategory('');
        setBudget('');
        setPropertyType('');
    };

    const handleBuyProperty = (propertyId) => {
        navigate(`/app/property1/${propertyId}`);
    };

    const handleRentProperty = (propertyId) => {
        navigate(`/app/property2/${propertyId}`);
    };

    return (
        <>
            <div className="properties-list" style={{ padding: '3em 5%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2em', justifyItems: 'center' }}>
                {loading ? (
                    <p>Loading properties...</p>
                ) : filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                        property.status === "Available" && (
                            <div key={property.pronaID} style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '1em' }}>
                                {/* Dynamically Load the Image from the Server */}
                                <img
                                    src={formatPhotoUrl(property.photo)}
                                    alt={property.emri}
                                    style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                                <h3>{property.emri}</h3>
                                <p>{property.adresa}</p>
                                <p>{`Price: $${property.price}`}</p>
                                {property.type === 'Sell' && (
                                    <button onClick={() => handleBuyProperty(property.pronaID)}>Buy Now</button>
                                )}
                                {property.type === 'Rent' && (
                                    <button onClick={() => handleRentProperty(property.pronaID)}>Rent Now</button>
                                )}
                            </div>
                        )
                    ))
                ) : (
                    <p>No properties found. Try different filters.</p>
                )}
            </div>
        </>
    );
}

export default Properties;
