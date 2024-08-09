import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import 'dotenv/config';


const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_DOC_ID, serviceAccountAuth);

export default async(req, res) => {

    try {
        await doc.loadInfo(); // Carrega as propriedades do documento e planilhas
                
        const sheet = doc.sheetsByIndex[2]
        await sheet.loadCells('A2:B2')

        // Variaveis das celulas (A2 e B2) da planilha 
        const mostrarPromocaoCell = sheet.getCell(1, 0)        
        const textoCell = sheet.getCell(1, 1)    
        
        //confirmação de Recebimento da msg
        console.log(mostrarPromocaoCell.value, textoCell.value)

        //Imprimir na página a mensagem da planilha se estiver marcada a opção na panilha.
        res.end(JSON.stringify({
            showCoupon: mostrarPromocaoCell.value === 'VERDADEIRO',
            message: textoCell.value
        }))
        
    } catch (err) {
        res.end(JSON.stringify({
            showCoupon: false,
            message: ''
        }))
    }
}
    
