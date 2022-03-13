import React from 'react';
import { Paper, Typography } from '@mui/material';
import theme from '../../theme';

export const RadixInformationBox = ({ text }: { text: string }) => {
  return (
    <Paper
      elevation={0}
      style={{
        padding: '0.5rem',
        borderRadius: '8px',
        backgroundColor: theme.palette.highNeutral.light,
      }}
    >
      <Typography
        variant="caption"
        fontWeight="400"
        color={theme.palette.lowNeutral.medium}
      >
        {text}
      </Typography>
    </Paper>
  );
};
