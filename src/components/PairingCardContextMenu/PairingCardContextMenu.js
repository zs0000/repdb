import React, { useState } from 'react'
import s from './PairingCardContextMenu.module.css'
export default function PairingCardContextMenu() {
  
    const [showMenu, setShowMenu] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const handleContextMenu = (event) => {
        event.preventDefault();
        setShowMenu(true);
        setMousePosition({ x: event.clientX, y: event.clientY });
    }
    const handleClick = () => {
        setShowMenu(false);
    }
    const handleMouseDown = () => {
        setShowMenu(false);
    }
    const handleMouseLeave = () => {
        setShowMenu(false);
    }
    const handleScroll = () => {
        setShowMenu(false);
    }
    const menu = showMenu ? (
        <div
            className={s.menu}
            style={{ top: mousePosition.y, left: mousePosition.x }}
        >
            <div className={s.menuItem}>Add offspring</div>
            <div className={s.menuItem}>Delete pairing</div>
        </div>
    ) : null;
    return (
        <div
            className={s.container}
            onContextMenu={handleContextMenu}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onScroll={handleScroll}
            onClick={handleClick}
        >
            {menu} dkmsadk
        </div>
    )

    
}
