import coverImg from '../../../../public/image/cover4.jpg';
import coverImg2 from '../../../../public/image/cover5.jpg';
import bottomCover from '../../../../public/image/aboutImg.jpg';
import { NavLink } from "react-router-dom";
import partner1 from '../../../../public/Partneret/Albaelktrika.png'
import partner2 from '../../../../public/Partneret/alxedrix-logo.png'
import partner3 from '../../../../public/Partneret/ASGETO.png'
import partner4 from '../../../../public/Partneret/bechtel-enka-logo.png'
import partner5 from '../../../../public/Partneret/emona.jpg'
import partner6 from '../../../../public/Partneret/Jusaj.png'
import partner7 from '../../../../public/Partneret/siemens-logo-big.png'
import icon1 from '../../../../public/Icon/truck_6424440.png'
import icon2 from '../../../../public/Icon/insurance-policy_12477023.png'
import icon3 from '../../../../public/Icon/insurance-policy_12477023.png'
import icon4 from '../../../../public/Icon/banking-service_15546762.png'
import icon5 from '../../../../public/Icon/package_969259.png'
import './Home.css'

function Home() {
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center home-container" style={{ zIndex: '1', position: 'relative', backgroundColor: '' }}>
                <div className='cover position-relative' style={{ width: '100%', height: '40em' }}>
                    {/* Triangle overlay */}
                    <div className="triangle-overlay-1" style={{}}></div>
                    
                    <div className="cover-text-1 position-absolute text-start" style={{  }}>
                        <h1 style={{}}>ABI-G</h1>
                        <h4 style={{  }}>Shpedicion Ndërkombëtar</h4>
                        <h4 style={{  }}>International Spedicion</h4>
                        <p style={{  }}>Kompani e suksesshme në logjistikë dhe transport mallrash me një ekip të përkushtuar dhe një rrjet të gjerë, ne sigurohemi që çdo ngarkesë të arrijë në destinacionin e saj me siguri dhe në kohë.</p>
                        <NavLink to="/app/about" style={{ color: '#19282F', textDecoration: 'none' }}>
                            <button style={{ padding: '0.5em 1em', backgroundColor: '#ffbb27', color: '#19282F', border: 'none', borderRadius: '5px' }}>LEXONI MË SHUMË</button>
                        </NavLink>
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

            <div className='home-text d-flex flex-column justify-content-center align-items-center' style={{ }}>
                <h1>Fuqizojmë Biznesin Tuaj</h1>
                <p style={{fontSize: '1.1em', marginBlock: ''}}><b>Suksesi Ndërmjet Çdo Hapi Përpara</b></p>
                <p id='home-p' style={{}}>Zgjidhjet tona shtyjnë biznesin tuaj përpara, duke ju mbajtur konkurrues në një treg që ndryshon vazhdimisht. Ne ofrojmë shërbime inovative dhe të besueshme që përputhen me objektivat tuaja. Suksesi juaj është prioriteti ynë.</p>
            </div>

            <div className='about-text w-100 justify-content-center align-items-center' style={{  }}>
                <div className='at-1 d-flex flex-column justify-content-center align-items-center'>
                    <div className='at-2 d-flex flex-column justify-content-center ' style={{ }}>
                        <h1>Pse Të Na Zgjidhni</h1>

                        <p>Abi-G International Forwarding Spedition është një kompani e përparuar në logjistikë dhe transport mallrash.</p>

                        <div className='d-flex flex-column justify-content-center align-items-start w-100'>
                            <div className='d-flex flex-row justify-content-start align-items-start' >
                                <div className='about-items d-flex flex-column ' style={{  marginRight: '2em' }}>
                                    <img src={icon1} alt="" style={{ width: '25px', height: '25px' }} />
                                    <p><b>Transportin Organizim</b></p>
                                    <p>Ne organizojmë dhe menaxhojmë me përpikëri të gjitha aspektet e udhëtimit të ngarkesës suaj.</p>
                                </div>
                                <div className='about-items d-flex flex-column justify-content-center ' style={{  }}>
                                    <img src={icon3} alt="" style={{ width: '25px', height: '25px' }} />
                                    <p><b>Logistiken e Mallit</b></p>
                                    <p>Ne ofrojmë zgjidhje të avancuara për logjistikën e mallrave.</p>
                                </div>
                            </div>

                            <div className='d-flex flex-row justify-content-start align-items-start' >
                                <div className='about-items d-flex flex-column justify-content-center ' style={{ marginRight: '2em' }}>
                                    <img src={icon2} alt="" style={{ width: '25px', height: '25px' }} />
                                    <p><b>⁠Zhdoganimin e Mallit</b></p>
                                    <p>Ne ofrojmë shërbime profesionale për zhdoganimin e mallrave.</p>
                                </div>
                                <div className='about-items d-flex flex-column justify-content-center ' style={{  }}>
                                    <img src={icon5} alt="" style={{ width: '25px', height: '25px' }} />
                                    <p><b>Pagesat e Mallit</b></p>
                                    <p>Ne ofrojmë mënyra të sigurta dhe të përshtatshme për pagesat e mallrave</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='at-3 d-flex flex-column justify-content-center align-items-center'>
                    <img src={coverImg2} alt="" style={{  }} />
                </div>
            </div>

            <div className='about-text w-100 justify-content-center align-items-center' style={{  }}>
                <div className='at-4 d-flex flex-column justify-content-center align-items-center'>
                    <img src={coverImg} alt="" style={{  }} />
                </div>

                <div className='at-5 d-flex flex-column justify-content-center align-items-end'>
                    <div className='d-flex flex-column justify-content-center gap-4' style={{  }}>
                        <h1>Ne ju ndihmojmë të bëni...</h1>

                        <p style={{  }}>Qoftë për të optimizuar logjistikën tuaj, për të siguruar transport efikas, apo për të naviguar nëpër sfidat e zhdoganimit, ne jemi këtu për të mbështetur biznesin tuaj në çdo hap të rrugës. Me vite përvoje dhe përkushtim ndaj ekselencës, ekipi ynë është i dedikuar për të ofruar zgjidhje që përmbushin nevojat tuaja specifike.</p>

                        <p style={{  }}>Duke u kujdesur për dërgesat me precizion dhe duke siguruar dorëzime në kohë, ne përqendrohemi në ofrimin e shërbimeve të besueshme dhe të personalizuara që nxisin suksesin tuaj. Na besoni për të menaxhuar logjistikën tuaj me saktësi, në mënyrë që ju të mund të fokusoheni në atë që ka më shumë rëndësi—rritjen e biznesit tuaj.</p>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '25em', marginTop: '3em' }}>
                <img src={bottomCover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div className='partners d-flex flex-column justify-content-center align-items-center gap-4' style={{  }}>
                <p style={{ fontSize: '3em' }}>Partnerët Tanë</p>

                <div className='d-flex justify-content-center align-items-center gap-4' style={{ flexWrap: 'wrap', width: '90%' }}>
                    <img src={partner1} alt="" style={{ width: '9em', objectFit: 'contain' }} />
                    <img src={partner2} alt="" style={{ width: '9em', objectFit: 'contain' }} />
                    <img src={partner3} alt="" style={{ width: '9em', objectFit: 'contain' }} />
                    <img src={partner4} alt="" style={{ width: '9em', objectFit: 'contain' }} />
                    <img src={partner5} alt="" style={{ width: '9em', objectFit: 'contain' }} />
                    <img src={partner6} alt="" style={{ width: '9em', objectFit: 'contain' }} />
                    <img src={partner7} alt="" style={{ width: '9em', objectFit: 'contain' }} />
                </div>
            </div>
        </>
    );
}

export default Home