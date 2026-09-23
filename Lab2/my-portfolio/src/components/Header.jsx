import React from 'react';
import myPhoto from '../assets/myPhoto.jpg';

function Header() {
    return (
        <header className="header-card">
            <img
                src = {myPhoto}
                alt = "myPhoto" 
                className = "profile-img"
                />
                <h1>Zhanarys Ryskali</h1>
                <p className="subtitle">Cybersecurity Specialist</p>
        </header>

    )
}

export default Header;