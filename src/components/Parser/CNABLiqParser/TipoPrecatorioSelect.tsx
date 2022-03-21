import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFormikContext } from 'formik';

const tiposRecebiveis = [
  { value: 1, displayValue: '01 - Duplicata' },
  { value: 2, displayValue: '02 - Nota Promissória' },
  { value: 6, displayValue: '06 - Nota Promissória Física' },
  { value: 14, displayValue: '14 – Duplicata de Serviço Física' },
  { value: 15, displayValue: '15 - Cota de consórcio ativa' },
  { value: 16, displayValue: '16: Cota de consórcio cancelada' },
  { value: 18, displayValue: '18: Cota de consórcio ativa p/ cancelar' },
  { value: 41, displayValue: '41 - CCB (Pré-fixada)' },
  { value: 51, displayValue: '51 - Cheque' },
  { value: 53, displayValue: '53 - Precatório Estadual' },
  { value: 54, displayValue: '54 - Precatório Federal' },
  { value: 55, displayValue: '55 - Precatório Municipal' },
  { value: 60, displayValue: '60 – Contrato' },
  { value: 61, displayValue: '61 – Contrato Físico' },
  { value: 62, displayValue: '62 – Confissão de Divida' },
  { value: 65, displayValue: '65 – Fatura de Cartão Credito' },
  { value: 67, displayValue: '67 - Bloqueio agenda pagamento Cartao' },
  { value: 73, displayValue: '73 - Home Equity' },
  { value: 74, displayValue: '74 - Financiamento de imóvel' },
  { value: 75, displayValue: '75 - Auto Equity' },
  { value: 76, displayValue: '76 - Financiamento de automóvel' },
  { value: 77, displayValue: '77 - Financiamento de moto' },
  { value: 78, displayValue: '78 - Consignado Privado' },
  { value: 79, displayValue: '79 - Antecipação de salário' },
  { value: 80, displayValue: '80 - Consignado - Creditas Store' },
  { value: 81, displayValue: '81 - Previdência' },
  { value: 97, displayValue: '97 - Ação Judicial' },
];

export const TipoPrecatorioSelect = () => {
  const { values, handleChange } = useFormikContext<any>();

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Tipo de Recebivel</InputLabel>
        <Select
          name="tipoRecebivel"
          value={values.tipoRecebivel}
          label="Tipo de recebivel"
          onChange={handleChange}
        >
          {tiposRecebiveis.map((tipo) => (
            <MenuItem key={tipo.value} value={tipo.value}>
              {tipo.displayValue}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
