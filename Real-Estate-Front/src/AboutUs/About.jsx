import coverImg from '../assets/cover4.jpg';
import { NavLink } from "react-router-dom";
import image from '../assets/aboutImg.jpg'
import certificate1 from '../assets/Certificate/202312301434-1.png'
import certificate2 from '../assets/Certificate/202312301435-1-1.png'
import certificate3 from '../assets/Certificate/202312301435-1.png'
import certificate4 from '../assets/Certificate/202312301435-2-1.png'
import './About.css';

function About() {
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ zIndex: '1', position: 'relative', backgroundColor: '' }}>
                <div className='position-relative' style={{ width: '100%', height: '20em' }}>
                    {/* Triangle overlay */}
                    <div className="triangle-overlay" style={{ }}></div>
                    
                    <div className="title position-absolute text-start" style={{}}>
                        <h1 style={{}}>Rreth Nesh</h1>
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

            <div className='about-txt justify-content-center align-items-center' style={{  }}>
                <div className='about-txt-1 d-flex flex-column justify-content-center align-items-center' style={{  }}>
                    <h1>Historia Jonë</h1>

                    <p style={{  }}>Abi-G Shpedicion Ndërkombëtar është një kompani e suksesshme në logjistikë dhe transport mallrash, me bazë në Qyshk, Pejë, Republika e Kosovës. E themeluar në vitin 2001, Abi-G ka zgjeruar shërbimet e saj me zyra në kryeqytet të Kosovës Prishtina.</p>

                    <p style={{  }}>Ne ofrojmë zgjidhje të besueshme për transportin e mallrave, brenda dhe jashtë vendit. Me një ekip të përkushtuar dhe një rrjet të gjerë, ne sigurohemi që çdo ngarkesë të arrijë në destinacionin e saj me siguri dhe në kohë.</p>

                    <p style={{  }}>Abi-G është i përkushtuar ndaj ekselencës dhe kënaqësisë së klientit, duke ofruar shërbime të personalizuara për nevojat e biznesit tuaj.</p>
                </div>

                <div className='about-img d-flex flex-column justify-content-center' style={{  }} >
                    <img src={image} alt="" style={{ }} />
                </div>
            </div>

            <div className='certificat d-flex flex-column justify-content-center align-items-center gap-5' style={{  }} >
                <h1>Certifikata të Arritjes</h1>

                <div className='certificat-img d-flex justify-content-center align-items-center gap-5' style={{  }} >
                    <img src={certificate1} alt="Certifikata 1" style={{  }} />
                    <img src={certificate2} alt="Certifikata 2" style={{  }} />
                    <img src={certificate3} alt="Certifikata 3" style={{  }} />
                    <img src={certificate4} alt="Certifikata 4" style={{  }} />
                </div>
            </div>
        </>
    );
}

export default About