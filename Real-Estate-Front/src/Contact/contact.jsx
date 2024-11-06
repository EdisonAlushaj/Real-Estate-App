import coverImg from '../assets/cover4.jpg';
import './Contact.css'

function Contact() {
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ zIndex: '1', position: 'relative', backgroundColor: '' }}>
                <div className='position-relative' style={{ width: '100%', height: '20em' }}>
                    {/* Triangle overlay */}
                    <div className="triangle-overlay" style={{
                        
                    }}></div>
                    <div className="title position-absolute text-start" style={{  }}>
                        <h1 style={{}}>
                            Kontakti
                        </h1>
                    </div>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img src={coverImg} alt="Cover Image" className="img-fluid w-100" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(211, 236, 167, 0.3)', // #D3ECA7 with 40% opacity
                            zIndex: 1
                        }}></div>
                    </div>
                </div>
            </div>

            <div className='contact align-items-center' style={{  }}>
                <div className='contact-item d-flex flex-column justify-content-center' style={{  }}>
                    <p><b>Lokacioni</b></p>

                    <p style={{ margin: '0' }}>Qyshk - Pejë, Kosovë</p>
                    <p style={{ margin: '0' }}>Prishtinë, Kosovë</p>
                </div>

                <div className='contact-item d-flex flex-column justify-content-center' style={{  }}>
                    <p><b>Numrat e Tel</b></p>

                    <p style={{ margin: '0' }}>00383(0)49 117 999</p>
                    <p style={{ margin: '0' }}>00383(0)49 200 092</p>
                </div>

                <div className='contact-item d-flex flex-column justify-content-center' style={{  }}>
                    <p><b>Email</b></p>

                    <p style={{ margin: '0' }}>info@abi-g.com</p>
                    <p></p>
                </div>
            </div>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d331.91460463472765!2d20.323176877850752!3d42.65667998983095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1352fd8d17918801%3A0x9ee38a6256f54ba0!2sDevolli%20Corporation!5e1!3m2!1sen!2s!4v1724185215596!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: '0' }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </>
    );
}

export default Contact