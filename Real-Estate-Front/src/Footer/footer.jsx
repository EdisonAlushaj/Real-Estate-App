function Footer() {
    return (
        <footer className="bg-dark text-light py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Water Sewer</h5>
                        <p>Providing quality water and sewer services since [year].</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light">Home</a></li>
                            <li><a href="#" className="text-light">About Us</a></li>
                            <li><a href="#" className="text-light">Services</a></li>
                            <li><a href="#" className="text-light">Projects</a></li>
                            <li><a href="#" className="text-light">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact Information</h5>
                        <p>123 Water Street<br />Cityville, State 12345<br />Phone: (123) 456-7890<br />Email: info@watersewer.com</p>
                    </div>
                </div>
                <hr className="bg-light" />
                <div className="text-center">
                    <p>&copy; 2023 Water Sewer. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer