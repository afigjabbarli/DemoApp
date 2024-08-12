import React from 'react';
import './ClientLayout.css';

const ClientLayout = (props) => {
  return (
    
    <main id='ClientLayout'>
        {props.children}
    </main>
    
  )
}

export default ClientLayout