import coverImg from '../assets/cover.png';

function AboutUs() {
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ zIndex: '1', position: 'relative', backgroundColor: '' }}>
                <div className='position-relative' style={{ width: '100%', height: '25em' }}>
                    <div className="position-absolute text-start" style={{ zIndex: 1, top: '50%', transform: 'translateY(-50%)', color: '#ffffff', marginLeft: '10em' }}>
                        <h1 style={{ fontSize: '4em', width: '8em' }}>About Our Company</h1>
                        <p style={{ width: '35em' }}>Sint anim aliqua et elit quis adipisicing est consequat cillum fugiat id adipisicing. Ut sit aliquip dolore eu minim. Quis nulla tempor incididunt nulla.</p>
                    </div>
                    <img src={coverImg} alt="Cover Image" className="img-fluid w-100" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            </div>

            <div className='d-flex flex-column align-items-center justify-content-center w-100 gap-5' style={{ height: '55em' }}>
                <div className='d-flex flex-row align-items-center justify-content-center' style={{ width: '85%', height: '35%' }}>
                    <div className='d-flex flex-column align-items-center justify-content-center' style={{ border: '1px solid black', borderRight: 'none', height: '100%', width: '50%' }}>
                        <p style={{ fontSize: '1.4em' }}>Our History</p>

                        <p style={{ textAlign: 'justify', width: '75%' }}>Aute laborum excepteur culpa est aute nulla duis laborum. Reprehenderit magna irure anim officia. Laborum anim cupidatat dolore id minim sit fugiat excepteur veniam. Non id eiusmod laboris ullamco officia ut dolor in occaecat esse velit ut Lorem nostrud. Ad commodo veniam do eu laborum occaecat enim fugiat. Id dolor consequat est cillum excepteur non. Commodo id est voluptate incididunt officia tempor et nulla cupidatat elit ad deserunt mollit fugiat.</p>
                    </div>

                    <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: '100%', width: '50%' }}>
                        <img src={coverImg} alt="Cover Image" className="img-fluid w-100" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
                <div className='d-flex flex-row align-items-center justify-content-center' style={{ width: '85%', height: '35%' }}>
                    <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: '100%', width: '50%' }}>
                        <img src={coverImg} alt="Cover Image" className="img-fluid w-100" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div className='d-flex flex-column align-items-center justify-content-center' style={{ border: '1px solid black', borderLeft: 'none' , height: '100%', width: '50%' }}>
                        <p style={{ fontSize: '1.4em' }}>Our Mission</p>

                        <p style={{ textAlign: 'justify', width: '75%' }}>Aute laborum excepteur culpa est aute nulla duis laborum. Reprehenderit magna irure anim officia. Laborum anim cupidatat dolore id minim sit fugiat excepteur veniam. Non id eiusmod laboris ullamco officia ut dolor in occaecat esse velit ut Lorem nostrud. Ad commodo veniam do eu laborum occaecat enim fugiat. Id dolor consequat est cillum excepteur non. Commodo id est voluptate incididunt officia tempor et nulla cupidatat elit ad deserunt mollit fugiat.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUs