import { read, utils } from 'xlsx';
import map from 'lodash/map';
import { fundos } from '../CNABLiqParser/FundoSelect';

const excelColumnHeader = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export function SheetJSParser(file: any, values: any, callback: any) {
  const reader = new FileReader();
  reader.onload = (e) => {
    /* Parse data */
    const ab = e.target?.result;
    const workbook = read(ab, { type: 'array' });

    const initialSheetName = workbook.SheetNames[0];
    const currentWb = workbook.Sheets[initialSheetName];

    const data: any[] = utils.sheet_to_json(currentWb, {
      header: 1,
      raw: false,
    });
    // const cleanData = cleanWorksheet(data);
    /**
     * Grab first row and use it as headers
     */
    data.shift();

    const formattedData = map(data, (row: any) => {
      const formattedRow: any = {};
      row.forEach((cell: any, index: number) => {
        // Listar Coluna por letra
        formattedRow[excelColumnHeader[index]] = cell;
      });

      return formattedRow;
    });

    // Formatted data with headers now we're going to map it to the correct json object
    const recebiveis = map(formattedData, (row: any) => {
      return {
        numeroControle: row.C, // Identificar único do titulo na consultoria (Gerado a partir do idenficadorCessao)
        coobrigacao: parseInt(row.O) === 2 ? false : true, // Coluna O da planilha BASE (CNAB)
        ocorrencia: values.ocorrencia, // Ver Tabela de Ocorrencias NÃO EXISTE ARQUIVO
        tipo: values.tipoRecebivel, // Ver tabela de Tipos NÃO EXISTE ARQUIVO
        documento: row.A, // CNPJ Cedente BASE (CNAB)
        sacado: {
          pessoa: {
            tipo: 'PJ', // PJ OU PF // Liquidacao Tipo pessoa destino
            identificacao: row.G, // CNPJ OU CPF Liquidacao (CPF/CNPJ destino) G
            nome: row.H, // Nome completo ou razao social Liquidacao (Nome destion) H
          },
        },
        cedente: {
          tipo: parseInt(row.P) === 2 ? 'PJ' : 'PF', // BASE (CNAB), Coluna P
          identificacao: row.A, // BASE (CNAB), Coluna A
          nome: row.B, // BASE (CNAB), Coluna B
        },
        emissao: row.N, // Data de emissao BASE (CNAB), Coluna N
        aquisicao: row.N, // Data de aquisicao Coluna N
        vencimento: row.E, // BASE (CNAB), Coluna E (DT_VENCIMENTO)
        valores: {
          face: row.F, // BASE (CNAB), Coluna F (VL_NOMINAL)
          aquisicao: row.I, // BASE (CNAB), Coluna I (VL_PRESENTE)
        },
      };
    });

    const originador = {
      originador: {
        codigo: values.fundo, // Código é fornecido pela BRL, preciso dessa informação para montar o código correto
        nome: fundos.filter((item) => item.value === values.fundo)[0]
          .displayValue, // Nome do fundo
      },
      identificadorCessao: 'IDGERADO',
    };

    callback({
      ...originador,
      recebiveis,
    });
  };

  reader.readAsArrayBuffer(file);
}
