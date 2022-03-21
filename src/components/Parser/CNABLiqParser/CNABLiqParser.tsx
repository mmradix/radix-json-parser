import React, { useEffect, useRef, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
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

import { JSONTree } from 'react-json-tree';
import { SheetJSParser } from '../Sheets/ReportFormatter';
import { TipoPrecatorioSelect } from './TipoPrecatorioSelect';
import { OcorrenciasSelect } from './OcorrenciasSelect';
import { FundoSelect } from './FundoSelect';

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

interface Props {
  fileType: FileType;
}

function download(content: any, fileName: any, contentType: any) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

const FileParserComponent = ({ fileType }: Props) => {
  const { values } = useFormikContext<any>();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [jsonData, setJsonData] = useState(null);

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

  const handleFileCallback = (jsonfile: any) => {
    setJsonData(jsonfile);
  };

  useEffect(() => {
    if (selectedFile) {
      setLoading(true);
      SheetJSParser(selectedFile, values, handleFileCallback);
    }
  }, [selectedFile, values]);

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
      {fileName && !loading && jsonData && (
        <Stack spacing={2}>
          <JSONTree data={jsonData} />
          <Button
            variant="outlined"
            component="span"
            startIcon={<AttachFileRoundedIcon />}
            style={{ fontWeight: 'bold' }}
            onClick={() => {
              console.log(jsonData);
              download(
                JSON.stringify(jsonData),
                'cessao.json',
                'application/json'
              );
            }}
          >
            Baixar JSON
          </Button>
        </Stack>
      )}
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
          Vamos começar selecionando o tipo da ocorrência e o tipo do precatório
          que deseja, em seguida adicione o arquivo de CNAB para conversão.
        </Typography>
        <Stack spacing={2}>
          <Formik
            initialValues={{
              tipoRecebivel: 54,
              ocorrencia: 1,
              fundo: '37436930000100',
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {() => (
              <>
                <TipoPrecatorioSelect />
                <OcorrenciasSelect />
                <FundoSelect />
                <Stack spacing={1}>
                  <Typography variant="caption">
                    Anexo arquivo de CNAB.
                  </Typography>
                  <RadixInformationBox text="Adicionar o documento criado na rede e no formato XLSX." />
                </Stack>
                <FileParserComponent fileType={FileType.CNAB} key="CNAB" />
              </>
            )}
          </Formik>
        </Stack>
      </Stack>
    </Container>
  );
};

export default CNABLiqParser;
