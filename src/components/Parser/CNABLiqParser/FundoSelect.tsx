import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFormikContext } from 'formik';

export const fundos = [
  { value: '37436930000100', displayValue: 'ROCKET - 37436930000100' },
  { value: '28381802000108', displayValue: 'ROCKET II - 28381802000108' },
  { value: '37511729000132', displayValue: 'FUEL - 37511729000132' },
];

export const FundoSelect = () => {
  const { values, handleChange } = useFormikContext<any>();

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Fundo</InputLabel>
        <Select
          name="fundo"
          value={values.fundo}
          label="Escolha o fundo"
          onChange={handleChange}
        >
          {fundos.map((fundo) => (
            <MenuItem key={fundo.value} value={fundo.value}>
              {fundo.displayValue}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
