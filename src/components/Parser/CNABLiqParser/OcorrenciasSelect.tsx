import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFormikContext } from 'formik';

const ocorrencias = [
  { value: 1, displayValue: '01 - Remessa' },
  { value: 4, displayValue: '04 - Abatimento (mediante justificativa)' },
  {
    value: 6,
    displayValue:
      '06 - Alteração de vencimento (para efeito de conciliação. Não altera o vencimento original)',
  },
  { value: 11, displayValue: '11 - Aquisição de contratos futuros' },
  { value: 12, displayValue: '12 - Aquisição de baixa de contratos futuros' },
  { value: 14, displayValue: '14 - Pagamento Parcial' },
  {
    value: 20,
    displayValue: '20 - Prorrogação da data de vencimento do título',
  },
  {
    value: 71,
    displayValue:
      '71 - Baixa por recompra, baixa mediante entrada de novo titulo – com liquidação  para a consultoria (obrigatória contrapartida 81 no mesmo arquivo).',
  },
  { value: 72, displayValue: '72 - Recompra parcial sem adiantamento.' },
  { value: 73, displayValue: '73 - Recompra parcial com adiantamento.' },
  {
    value: 74,
    displayValue:
      '74 - Baixa por Recompra, baixa mediante entrada de novo titulo, com liquidação para o cedente (obrigatório contrapartida 84 no mesmo arquivo)',
  },
  { value: 75, displayValue: '75 - Baixa por Depósito Cedente' },
  { value: 76, displayValue: '76 - Baixa por Depósito Consultoria' },
  { value: 77, displayValue: '77 - Baixa por Depósito Sacado' },
  {
    value: 80,
    displayValue: '80 - Remessa (com liquidação para a consultoria).',
  },
  {
    value: 81,
    displayValue:
      '81 - Entrada por recompra troca de títulos, com objetivo de recompra, com liquidação para a consultoria (obrigatório contrapartida 71 no mesmo arquivo).',
  },
  {
    value: 84,
    displayValue:
      '84 - Entrada por Recompra troca de títulos, com liquidação para o cedente (obrigatório contrapartida 74 no mesmo arquivo) se tiver recompra dentro da operação enviar as entradas com o código 84',
  },
  { value: 85, displayValue: '85 - Baixa por Recompra' },
  { value: 86, displayValue: '86 - Baixa por Recompra' },
  { value: 87, displayValue: '87 - Reativação' },
  { value: 95, displayValue: '95 - Baixa por Venda' },
  {
    value: 99,
    displayValue:
      '99 - Recebível reprovado por consultoria ou gestor (o recebível não será adquirido, não sendo enviado para o sistema de custódia)',
  },
];

export const OcorrenciasSelect = () => {
  const { values, handleChange } = useFormikContext<any>();

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Ocorrência</InputLabel>
        <Select
          name="ocorrencia"
          value={values.ocorrencia}
          label="Ocorrência"
          onChange={handleChange}
        >
          {ocorrencias.map((ocorrencia) => (
            <MenuItem value={ocorrencia.value} key={ocorrencia.value}>
              {ocorrencia.displayValue}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
