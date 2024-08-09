import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'

const Header = () => {
    return (
        <React.Fragment>    
            <div className={styles.wrapper}>
                <div className='container mx-auto flex items-stretch'>
                    <Link className='mx-auto' href='/'><img src='/home.png' alt='Pitaco'/></Link>
                    <div>
                        <Link className='mx-auto px-1 hover:underline' href='/sobre' >Sobre</Link>
                        <Link className='mx-auto px-1 hover:underline' href='/contato'>Contato</Link>
                        <Link className='mx-auto px-1 hover:underline' href='/pesquisa'>Pesquisa</Link>
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default Header