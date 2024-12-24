// Properties.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PronaEndPoint } from '../../../Application/Services/endpoints';
import coverImg from '../../../../public/Image/property-1.png';
import './Service.css';

function Properties() {
    const [allProperties, setAllProperties] = useState([]); // Të gjitha pronat
    const [filteredProperties, setFilteredProperties] = useState([]); // Pronat e filtruar
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [budget, setBudget] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false); // Tregon nëse është bërë kërkim

    // Ngarko të gjitha pronat kur komponenti ngarkohet
    useEffect(() => {
        const fetchAllProperties = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${PronaEndPoint}/GetAll`);
                setAllProperties(response.data);
                setFilteredProperties(response.data); // Fillimisht, të gjitha pronat janë të shfaqura
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProperties();
    }, []);

    // Funksioni për të bërë filtrimin e pronave
    const handleSearch = async () => {
        setLoading(true);
        setHasSearched(true); // Kërkimi është bërë

        // If no filters are provided, return all properties
        if (!location && !category && !budget) {
            setFilteredProperties(allProperties);
            setLoading(false);
            return;
        }

        try {
            // Sending filtered parameters to the backend
            const response = await axios.get(`${PronaEndPoint}/GetFilteredProperties`, {
                params: {
                    location,
                    category,
                    maxPrice: budget || undefined, // Optional parameter
                },
            });

            // Update the filtered properties state with the response data
            setFilteredProperties(response.data);
        } catch (error) {
            console.error('Error filtering properties:', error);
        } finally {
            setLoading(false);
        }
    };

    // Funksioni për të kthyer të gjitha pronat
    const handleShowAllProperties = () => {
        setFilteredProperties(allProperties); // Kthehu te të gjitha pronat
        setHasSearched(false); // Reset the search state
        setLocation('');
        setCategory('');
        setBudget('');
    };

    // Funksioni për blerjen e pronës
    const handleBuyProperty = (propertyId) => {
        // Ky funksion mund të realizojë veprime si hapja e një forme për blerje ose dërgimi i të dhënave në server
        alert(`You have selected property with ID: ${propertyId} for purchase.`);
    };

    return (
        <>
            {/* Cover Section */}
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ zIndex: '1', position: 'relative' }}>
                <div className="position-relative" style={{ width: '100%', height: '40em' }}>
                    <div className="triangle-overlay-1"></div>
                    <div className="title position-absolute text-start">
                        <h1>Find a Property</h1>
                    </div>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img
                            src={coverImg}
                            alt="Cover Image"
                            className="img-fluid w-100"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(211, 236, 167, 0.3)',
                                zIndex: 1,
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="search-bar d-flex justify-content-center" style={{ padding: '2em', backgroundColor: '#fff' }}>
                <div
                    className="search-form d-flex align-items-center gap-3"
                    style={{
                        backgroundColor: '#f9f9f9',
                        padding: '1em 2em',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '0.5em',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            outline: 'none',
                        }}
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '0.5em',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            outline: 'none',
                            backgroundColor: '#fff',
                        }}
                    >
                        <option value="">Property Type</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="land">Land</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '0.5em',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            outline: 'none',
                        }}
                    />
                    <button
                        onClick={handleSearch}
                        style={{
                            padding: '0.5em 1.5em',
                            backgroundColor: '#000',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {loading ? 'Searching...' : 'Search Now'}
                    </button>
                </div>
            </div>

            {/* Show All Properties Button (only after search) */}
            {hasSearched && (
                <div className="d-flex justify-content-center" style={{ marginTop: '1em' }}>
                    <button
                        onClick={handleShowAllProperties}
                        style={{
                            padding: '0.5em 1.5em',
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Show All Properties
                    </button>
                </div>
            )}

            {/* Properties List */}
            <div className="properties-list d-flex flex-column align-items-center" style={{ padding: '3em 0' }}>
                {loading ? (
                    <p>Loading properties...</p>
                ) : filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                        <div
                            key={property.pronaID}
                            style={{
                                padding: '1em',
                                margin: '1em 0',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                width: '80%',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <h3>{property.emri}</h3>
                            <p>{property.adresa}</p>
                            <p>{`Price: $${property.price}`}</p>
                            <p>{property.description}</p>
                            <button
                                onClick={() => handleBuyProperty(property.pronaID)}
                                style={{
                                    padding: '0.5em 1.5em',
                                    backgroundColor: '#FF6347',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Buy Now
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No properties found. Try different filters.</p>
                )}
            </div>
        </>
    );
}

export default Properties;
