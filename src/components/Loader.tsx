import React from "react";

const Loader: React.FC = () => {
    return (
        <div className="loading-container">
            <div className="loader">
                <div className="rect1"/>
                <div className="rect2"/>
                <div className="rect3"/>
                <div className="rect4"/>
                <div className="rect5"/>
            </div>
            <h3>Loading...</h3>
        </div>
    );
};

export default Loader;