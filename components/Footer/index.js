import React from 'react'

const Footer = () => {
    return(
        <div className='bg-cyan-700 p-8'>
            <div className='container mx-auto text-center text-white'>
                <a>Desenvolvido por: Alexandre Dimas</a> - {' '}
                <a className='hover:underline' href='https://github.com/AlexDimas238'>GitHub</a> {' '}
                <a className='hover:underline' href='https://www.linkedin.com/in/alexandredimas/'>LinkedIn</a>
            </div>
        </div>
    )
}

export default Footer