import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProjectAPI } from '../endPoints.jsx'
import { ToastContainer, toast } from 'react-toastify';
import coverImg from '../assets/cover.png';

const Project = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        axios.get('https://localhost:7255/api/Projects')
            .then((response) => {
                console.log(response);
                setProjects(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ zIndex: '1', position: 'relative', backgroundColor: '' }}>
                <div className='position-relative' style={{ width: '100%', height: '25em' }}>
                    <div className="position-absolute text-start" style={{ zIndex: 1, top: '50%', transform: 'translateY(-50%)', color: '#ffffff', marginLeft: '10em' }}>
                        <h1 style={{ fontSize: '4em', width: '8em' }}>Our Project</h1>
                        <p style={{ width: '35em' }}>Sint anim aliqua et elit quis adipisicing est consequat cillum fugiat id adipisicing. Ut sit aliquip dolore eu minim. Quis nulla tempor incididunt nulla.</p>
                    </div>
                    <img src={coverImg} alt="Cover Image" className="img-fluid w-100" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            </div>

            <div className='d-flex flex-wrap justify-content-center w-100' style={{ padding: '5em' }}>

                {
                    projects && projects.length > 0 ?
                        projects.map((item, index) => {
                            return (
                                <div key={item.id || index} className='d-flex flex-column align-items-center justify-content-center m-3' style={{ width: '40em', maxWidth: '100%' }}>
                                    <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: '18em', width: '80%' }}>
                                        <img src={item.image} alt="Cover Image" className="img-fluid w-100" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>

                                    <div className='d-flex flex-column align-items-center justify-content-center' style={{ border: '1px solid black', height: '100%', width: '80%' }}>
                                        <p style={{ fontSize: '1.4em' }}>{item.name}</p>

                                        <p style={{ textAlign: 'justify', width: '90%' }}>{item.description}</p>
                                    </div>
                                </div>
                            )
                        })
                        :
                        'Loading...'
                }
            </div>
        </>
    );
}

export default Project