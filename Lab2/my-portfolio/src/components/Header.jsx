import React from 'react';

function Header() {
    return (
        <header className="header-card">
            <img
                src = "/myPhoto.jpg" 
                alt = "myPhoto" 
                className = "profile-img"
                />
                <h1>Zhanarys Ryskali</h1>
                <p className="subtitle">Cybersecurity Specialist</p>
        </header>

    )
}

export default Header;