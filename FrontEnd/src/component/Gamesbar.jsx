import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Gamesbar = ({ activeGame }) => {
    const gamesGroupContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        const container = gamesGroupContainerRef.current;
        const handleTouchMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = x - startX;
            container.scrollLeft = scrollLeft - walk;
        };

        container.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener('touchmove', handleTouchMove, { passive: false });
        };
    }, [isDragging, startX, scrollLeft]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - gamesGroupContainerRef.current.offsetLeft);
        setScrollLeft(gamesGroupContainerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - gamesGroupContainerRef.current.offsetLeft;
        const walk = x - startX;
        gamesGroupContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX - gamesGroupContainerRef.current.offsetLeft);
        setScrollLeft(gamesGroupContainerRef.current.scrollLeft);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="gamesgroup-container"
            ref={gamesGroupContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="gamesgroup">
                <Link to="/" className={`listgames ${activeGame === 'popular match' ? 'active' : ''}`}>
                    popular match
                </Link>
                <Link to="/games/sportbook" className={`listgames ${activeGame === 'sportbook' ? 'active' : ''}`}>
                    sportbook
                </Link>
                <Link to="/games/slot" className={`listgames ${activeGame === 'slot' ? 'active' : ''}`}>
                    slot
                    <span className="newgames">baru</span>
                </Link>
                <Link to="/games/livecasino" className={`listgames ${activeGame === 'livecasino' ? 'active' : ''}`}>
                    live casino
                    <span className="newgames">baru</span>
                </Link>
                <Link to="/games/virtualsportbook" className={`listgames ${activeGame === 'virtualsportbook' ? 'active' : ''}`}>
                    virtual sportbook
                    <span className="newgames">baru</span>
                </Link>
                <Link to="/games/virtualcasino" className={`listgames ${activeGame === 'virtualcasino' ? 'active' : ''}`}>
                    virtual casino
                    <span className="newgames">baru</span>
                </Link>
            </div>
        </div>
    );
};
