import React from 'react';

const stockListItem = ({stock}) => {
    
    return (
        <li className="list-group-item">
           <div>{stock}</div>
        </li>
    )
}

export default stockListItem;