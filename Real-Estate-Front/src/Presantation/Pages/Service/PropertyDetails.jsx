import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import axios from 'axios';
import { PronaEndPoint } from '../../../Application/Services/endpoints';
import coverImg from '../../../../public/Image/property-1.png';
import Header from '../../Components/Header/Header'; // Import Header
import Footer from '../../Components/Footer/footer'; // Import Footer

function PropertyDetails() {
    const { id } = useParams(); // Get the property ID from the URL
    const navigate = useNavigate(); // Use useNavigate hook
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    // Fetch property details when the component mounts
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

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Your inquiry has been submitted!');
    };

    // Delete property method
    const handleDelete = async () => {
        try {
            await axios.delete(`${PronaEndPoint}/DeleteProperty`, { params: { id } });
            alert('Property deleted successfully!');
            navigate('/'); // Use navigate to redirect to home after deletion
        } catch (error) {
            console.error('Error deleting property:', error);
            alert('There was an error deleting the property. Please try again later.');
        }
    };

    // If loading, show loading message
    if (loading) {
        return <p>Loading property details...</p>;
    }

    // If property not found
    if (!property) {
        return <p>Property not found.</p>;
    }

    return (
        <div>
            <Header />
            <div style={{ padding: '6em 0 0', backgroundColor: '#f4f4f9' }}> {/* Add padding-top to create space */}
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
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PropertyDetails;
