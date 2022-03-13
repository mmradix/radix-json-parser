import { read, utils } from 'xlsx';
import filter from 'lodash/filter';
import isNan from 'lodash/isNaN';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';

function cleanWorksheet(data: any[]) {
  return filter(data, (row: any) => {
    const test = filter(row, (cell: any) => cell !== '');

    if (isNan(test.reduce((prev, curr) => prev + curr))) {
      return false;
    }
    return true;
  });
}

export function SheetJSParser(file: any) {
  const reader = new FileReader();
  reader.onload = (e) => {
    /* Parse data */
    const ab = e.target?.result;
    const workbook = read(ab, { type: 'array' });
    console.log(workbook.SheetNames);

    const initialSheetName = workbook.SheetNames[0];
    const currentWb = workbook.Sheets[initialSheetName];

    const data = utils.sheet_to_json(currentWb, { header: 1 });
    const cleanData = cleanWorksheet(data);
    /**
     * Grab first row and use it as headers
     */
    const headers = cleanData.shift();
    console.log(headers);
    console.log(cleanData);

    const formattedData = map(cleanData, (row: any) => {
      const formattedRow: any = {};
      row.forEach((cell: any, index: number) => {
        let header = headers[index];

        if (isUndefined(header)) {
          header = `column-${index}`;
        }

        formattedRow[header] = cell;
      });
      return formattedRow;
    });

    console.log(formattedData);
  };

  reader.readAsArrayBuffer(file);
}
