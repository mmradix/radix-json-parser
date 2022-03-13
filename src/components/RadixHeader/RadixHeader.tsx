import * as React from 'react';
import {
  AppBar,
  Breadcrumbs,
  IconButton,
  Link,
  SvgIcon,
  Toolbar,
  Typography,
} from '@mui/material';

import { ReactComponent as RadixSVGLogo } from '../../logo.svg';

const RadixLogo = () => {
  return (
    <SvgIcon>
      <RadixSVGLogo />
    </SvgIcon>
  );
};

const RadixHeader = () => {
  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar variant="dense">
        <IconButton>
          <RadixLogo />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Conversor
          </Link>

          <Typography color="text.primary" fontWeight="bold">
            CNAB e Liquidação
          </Typography>
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
};

export default RadixHeader;
