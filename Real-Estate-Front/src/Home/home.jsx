import coverImg from '../assets/cover.png';
import './home.css';

function Home() {
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ zIndex: '1', position: 'relative', backgroundColor: '' }}>
                <div className='position-relative' style={{ width: '100%', height: '45em' }}>
                    <div className="position-absolute text-start" style={{ zIndex: 1, top: '50%', transform: 'translateY(-50%)', color: '#ffffff', marginLeft: '10em' }}>
                        <h1 style={{ fontSize: '4em', width: '8em' }}>Welcome to Water Sewer</h1>
                        <p className="lead">Providing quality water and sewer services</p>
                        <p style={{ width: '35em' }}>Sint anim aliqua et elit quis adipisicing est consequat cillum fugiat id adipisicing. Ut sit aliquip dolore eu minim. Quis nulla tempor incididunt nulla.</p>
                    </div>
                    {/* Opsionale: Video ne background ne vend te Images */}
                    <img src={coverImg} alt="Cover Image" className="img-fluid w-100" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            </div>

            <div className='d-flex flex-row justify-content-center align-items-center' style={{height: '40em'}}>
                <div className='d-flex flex-row justify-content-center align-items-center w-75 gap-5' >
                    <div className='d-flex flex-column' style={{ width: '50%' }}>
                        <div style={{}}>
                            <h1>Dummy Big Text Hello There</h1>

                            <img src={coverImg} alt="" className="img-fluid w-100" style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>
                    <div className='d-flex flex-column' style={{ width: '50%' }}>
                        <div style={{}}>
                            <p><b>Id exercitation nisi velit adipisicing labore velit non reprehenderit. Qui id occaecat irure eiusmod duis.</b></p>

                            <p>Dolore commodo fugiat laborum veniam eiusmod sint amet magna. Et enim duis aute duis cillum adipisicing ea occaecat aliqua eiusmod ad tempor cillum ipsum. Commodo ea dolore ullamco anim velit fugiat officia minim Lorem labore adipisicing commodo exercitation sunt.</p>

                            <img src={coverImg} alt="" className="img-fluid w-100" style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: '20em' }}>
                <div className='w-75'>
                    <p style={{ fontSize: '3em' }}>Dummy Big Text</p>

                    <p>Anim deserunt velit aliquip cupidatat anim aliquip ea. Deserunt exercitation do duis id consequat in velit ullamco duis esse aliqua. Cillum velit magna amet sit est ea.</p>

                </div>

                <div className="d-flex flex-row align-items-center justify-content-start w-75" style={{ marginTop: '2em', gap: '13em' }}>
                    <div className="p-2">
                        <h4>111+</h4>
                        <p>To provide ...</p>
                    </div>
                    <div className="p-2">
                        <h4>222+</h4>
                        <p>To be the ...</p>
                    </div>
                    <div className="p-2">
                        <h4>333+</h4>
                        <p>We value ...</p>
                    </div>
                    <div className="p-2">
                        <h4>444+</h4>
                        <p>Reach out ...</p>
                    </div>
                </div>
            </div>



            <div className="d-flex flex-column align-items-center justify-content-center" style={{ zIndex: '1', position: 'relative', backgroundColor: '' }}>
                <div className='position-relative' style={{ width: '100%', height: '25em' }}>
                    <div className="position-absolute text-center" style={{ width: '100%', zIndex: 1, top: '50%', transform: 'translateY(-50%)', color: '#ffffff' }}>
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            <h1 style={{ fontSize: '3.5em', width: '45%' }}>Welcome to Water Sewer</h1>
                            <p style={{ width: '50%' }}>Sint anim aliqua et elit quis adipisicing est consequat cillum fugiat id adipisicing. Ut sit aliquip dolore eu minim. Quis nulla tempor incididunt nulla.</p>
                            <button style={{ padding: '10px 20px', fontSize: '1.2em', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>
                                Button
                            </button>
                        </div>
                    </div>
                    {/* 
            background-position: center;
            background-size: cover;
            background-attachment: fixed;
            background-repeat: no-repeat; */}
                    <img src={coverImg} alt="Cover Image" className="img-fluid w-100" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            </div>

            <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: '100%', height: '45em' }}>
                <p style={{ fontSize: '3.5em' }}>Our Featured Project</p>

                <div className="featured-projects-grid">
                    <div className="project-card">
                        <img src={coverImg} alt="Theater of Indonesia" className="project-image" />
                        <div className="project-info">
                            <h4>Theater of Indonesia</h4>
                            <p>Public Building</p>
                        </div>
                    </div>
                    <div className="project-card">
                        <img src={coverImg} alt="Balaraja Apartment" className="project-image" />
                        <div className="project-info">
                            <h4>Balaraja Apartment</h4>
                            <p>Apartment</p>
                        </div>
                    </div>
                    <div className="project-card">
                        <img src={coverImg} alt="The Puri Mall" className="project-image" />
                        <div className="project-info">
                            <h4>The Puri Mall</h4>
                            <p>Commercial Building</p>
                        </div>
                    </div>
                    <div className="project-card">
                        <img src={coverImg} alt="Cisoka Motel" className="project-image" />
                        <div className="project-info">
                            <h4>Cisoka Motel</h4>
                            <p>Public Building</p>
                        </div>
                    </div>
                    <div className="project-card">
                        <img src={coverImg} alt="Gatotkaca Office" className="project-image" />
                        <div className="project-info">
                            <h4>Gatotkaca Office</h4>
                            <p>Office Tower</p>
                        </div>
                    </div>
                    <div className="project-card">
                        <img src={coverImg} alt="Depok Arts Building" className="project-image" />
                        <div className="project-info">
                            <h4>Depok Arts Building</h4>
                            <p>Public Building</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Home