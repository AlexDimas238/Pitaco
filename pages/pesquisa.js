import react, {useState} from "react";
import Link from "next/link";
import Head from "next/head";

const Pesquisa = () => {
    const [form, setForm] = useState({
            Nome: '',
            Email: '',
            Whatsapp: '',
            Nota: 0,
    })
    const notas = [1, 2, 3, 4, 5]
    const [sucess, setSuccess] = useState(false)
    const [retorno, setRetorno] = useState({})

    const enviar = async () => {
        try {
        const response = await fetch('/api/enviar', {
            method: 'POST',
            body: JSON.stringify(form)
        })
        const data = await response.json()
        setSuccess(true)
        setRetorno(data)
    }catch (err){
    }
    } 

    const onChange = evt => {
        const value = evt.target.value
        const key = evt.target.name
        setForm(old => ({
            ...old,
            [key]: value
        }))
    }

    return (
        <div>
            <h1 className='text-center font-bold text-2xl'>Criticas e sugestões</h1>
            <p className='text-center my-4'>
                O nosso estabelecimento sempre busca atender melhor seus clientes.<br/> 
                Por isso estamos sempre abertos a ouvir a sua opinião
            </p>
            { !sucess && <div>
                <div className='w-44 mx-auto'>
                    <label className='font-bold'>Seu Nome:</label>
                    <input type='text' className='p-2 blok shadow bg-blue-100 my-1 rounded'placeholder='Nome' onChange={onChange} name='Nome' value={form.Nome} />
                    <label className='font-bold'>E-mail:</label>
                    <input type='text' className='p-2 blok shadow bg-blue-100 my-1 rounded'placeholder='Email' onChange={onChange} name='Email' value={form.Email}/>
                    <label className='font-bold'>Whatsapp:</label>
                    <input type='text' className='p-2 blok shadow bg-blue-100 my-1 rounded'placeholder='Whatsapp' onChange={onChange} name='Whatsapp' value={form.Whatsapp}/>

                    <p className='text-center my-4 text-xs'>Que nota você dá para nosso estabelecimento?</p>
                
                    <div className='flex text-center'>    
                        {notas.map(nota => {
                            return (
                            <label className='block w-1/5'>
                                {nota} <br/>
                                <input type='radio'name='Nota' value={nota} onChange={onChange}/>
                            </label>
                            )
                            })
                        }    
                    </div>

                </div> 

                <div className='text-center my-12 '>
                    <button className='bg-blue-400 px-8 py-3 font-bold rounded-lg hover:shadow shadow-md shadow-blue-800/80' onClick={enviar}>Enviar</button>
                </div>
            </div>}
            {sucess && <div className='w-1/2 mx-auto'>
                <p className='mb-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-2'>Obrigado por contribuir com sua sugestão.</p>
                {
                    retorno.showCoupon && <div className='text-center border p-4 mb-4'>
                        Seu Cupom: <br/>
                        <span className='font-bold text-2xl'>{retorno.Cupom}</span><br/><br/>
                        <span>Tire um print ou foto desta dela e apresente no nosso estabelecimento.</span>
                        </div>
                }
                </div>}
        </div>
    )
}


export default Pesquisa