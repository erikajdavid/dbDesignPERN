import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {

    return (
        <div>
            <h1>Welcome to my To-Do app</h1>
            <p>Start buidling your to-do list today.</p>
            <div className="landingLinksCtn">
                <Link to="/register" className="landingLink">Sign up</Link>
                <Link to="/login" className="landingLink">Log in</Link>
            </div>

        </div>
    );
}

export default LandingPage;