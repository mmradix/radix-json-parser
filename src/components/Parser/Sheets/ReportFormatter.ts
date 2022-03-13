import { read, utils } from 'xlsx';
import filter from 'lodash/filter';
import isNan from 'lodash/isNaN';

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
    console.log(cleanData);
  };

  reader.readAsArrayBuffer(file);
}
