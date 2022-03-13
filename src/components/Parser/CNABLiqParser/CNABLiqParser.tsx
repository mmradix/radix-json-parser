import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  IconButton,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { RadixInformationBox } from '../../InformationBox/InformationBox';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import CancelPresentation from '@mui/icons-material/CancelPresentation';

import LinearBuffer from './FileProgress';
// If you're using Immutable.js: `npm i --save immutable`
import { Map } from 'immutable';
import { JSONTree } from 'react-json-tree';
import { SheetJSParser } from '../Sheets/ReportFormatter';

enum FileType {
  CNAB = 'CNAB',
  LIQ = 'LIQ',
}

const Input = styled('input')({
  display: 'none',
});

const StyledDivContainer = styled('div')({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
});

// Inside a React component:
const json = {
  array: [1, 2, 3],
  bool: true,
  object: {
    foo: 'bar',
  },
  immutable: Map({ key: 'value' }),
};

interface Props {
  fileType: FileType;
}

const FileParserComponent = ({ fileType }: Props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const [loading, setLoading] = useState(false);

  const inputFileRef = useRef(null);

  const handleFileSelection = ({ target }: { target: any }) => {
    setSelectedFile(target.files[0]);
    setFileName(target.files[0].name);
  };

  const handleOnClickRemoveFile = () => {
    setSelectedFile(null);
    setFileName(null);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedFile) {
      setLoading(true);
      SheetJSParser(selectedFile);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  return (
    <>
      <StyledDivContainer>
        <label htmlFor="contained-button-file">
          <Input
            ref={inputFileRef}
            id="contained-button-file"
            type="file"
            onChange={handleFileSelection}
          />
          <Button
            variant="outlined"
            component="span"
            startIcon={<AttachFileRoundedIcon />}
            style={{ fontWeight: 'bold' }}
          >
            Anexar {fileType === FileType.CNAB ? 'CNAB' : 'Liquidação'}
          </Button>
        </label>
        {selectedFile && (
          <StyledDivContainer>
            <Typography variant="caption" style={{ marginLeft: '10px' }}>
              {fileName}
            </Typography>
            <IconButton
              color="primary"
              aria-label="Remover arquivo"
              component="span"
              onClick={handleOnClickRemoveFile}
            >
              <CancelPresentation />
            </IconButton>
          </StyledDivContainer>
        )}
      </StyledDivContainer>

      {loading && <LinearBuffer />}
      {fileName && !loading && <JSONTree data={json} />}
    </>
  );
};

const CNABLiqParser = () => {
  return (
    <Container maxWidth="sm" style={{ padding: '2rem 0' }}>
      <Stack spacing={2}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Converter novo arquivo
        </Typography>
        <Typography variant="subtitle1" fontWeight="600">
          Vamos começar adicionando o arquivo de liquidação e CNAB para
          conversão.
        </Typography>
        <Stack spacing={1}>
          <Typography variant="caption">
            Anexo arquivo de Liquidação.
          </Typography>
          <RadixInformationBox text="Adicionar o documento criado na rede e no formato XLSX." />
        </Stack>
        <FileParserComponent fileType={FileType.LIQ} key="LIQ" />
        <Stack spacing={1}>
          <Typography variant="caption">Anexo arquivo de CNAB.</Typography>
          <RadixInformationBox text="Adicionar o documento criado na rede e no formato XLSX." />
          <FileParserComponent fileType={FileType.CNAB} key="CNAB" />
        </Stack>
      </Stack>
    </Container>
  );
};

export default CNABLiqParser;
