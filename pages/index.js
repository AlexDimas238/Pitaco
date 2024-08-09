import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
    const {data, error} = useSWR('/api/get-promo', fetcher)

    // return (<pre>{JSON.stringify(data)}</pre>)
    
    return (
        <div>
            <p className=' text-sm text-center p-1'>
                O nosso estabelecimento sempre busca atender melhor seus clientes.<br/> 
                Por isso estamos sempre abertos a ouvir a sua opinião
            </p>
            <div className='text-center my-12 '>
                <Link className='bg-blue-400 px-8 py-3 font-bold rounded-lg hover:shadow shadow-md shadow-blue-800/80' href='/pesquisa'>Deixe sua sugestão</Link>
            </div>
            
            { !data && <p className='text-center'>Carregando...</p>}
            {!error && data && data.showCoupon &&
                <p className='text-xs text-center'>
                    {data.message}
                </p>
                }
            

        </div>
    )
}

export default Index
