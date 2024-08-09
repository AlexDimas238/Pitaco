import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import moment from 'moment';
import 'dotenv/config';


const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ],
});


const doc = new GoogleSpreadsheet('1CLnevnDPWc1E_WiVJFsnu7PNDxgp_-qX5G3aOhq2HMs', serviceAccountAuth);

const genCupom = () => {
    const code = parseInt(moment().format('DDMMHHMMssSSS')).toString(16).toUpperCase()
    return code
}

export default async(req, res) => {

    try {
        await doc.loadInfo();
                    
        const sheet = doc.sheetsByIndex[1]
        const data = JSON.parse(req.body)

        const sheetConfig = doc.sheetsByIndex[2]
        await sheetConfig.loadCells('A2:B2')

        const mostrarPromocaoCell = sheetConfig.getCell(1, 0)
        const textoCell = sheetConfig.getCell(1, 1)

        let Cupom = ''
        let Promo = ''
        if (mostrarPromocaoCell.value === 'VERDADEIRO') {
            Cupom = genCupom()
            Promo = textoCell.value
        }

        await sheet.addRow({
            Nome: data.Nome,
            Email: data.Email,
            Whatsapp: data.Whatsapp,
            Nota: parseInt(data.Nota),
            'Data Preenchimento': moment().format('DD/MM/YY, HH:mm:ss'),
            Cupom,
            Promo
        })
        res.end(JSON.stringify({
            showCoupon: Cupom != null,
            Cupom,
            Promo
        }))
    } catch (err) {
        console.error(err);
        res.end('Error')
    }
    
}