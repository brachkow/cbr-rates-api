import { Data, SimpleData, DefaultData, Rate } from './types';
import { parseHTML } from 'linkedom/worker';
import { toNumber } from './utils/toNumber';
import { round } from './utils/round';

const TABLE_ROW_SELECTOR = '.data tr';

interface OutputParams<T> {
  data: T;
  code: string;
  value: number;
  name: string;
}

export const simpleOutputGenerator = ({ data, code, value }: OutputParams<SimpleData>): SimpleData => {
  data[code] = value;

  return data;
};

export const defaultOutputGenerator = ({ data, code, value, name }: OutputParams<DefaultData>): DefaultData => {
  data[code] = {
    code,
    name,
    value,
  };

  return data;
};

type OutputGenerator = typeof simpleOutputGenerator | typeof defaultOutputGenerator;

const isSimpleData = (data: Data): data is SimpleData => {
  return typeof Object.values(data)[0] === 'number';
};

export const getRatesFromHtml = (html: string, output: OutputGenerator = defaultOutputGenerator): Data => {
  const { document } = parseHTML(html);
  const tableRows = document.querySelectorAll(TABLE_ROW_SELECTOR);
  let tableData: ReturnType<OutputGenerator> = {};

  if (tableRows) {
    for (let i = 1; i < tableRows.length; i++) {
      const row = tableRows[i];
      const rowData = row.getElementsByTagName('td');
      if (rowData.length > 0) {
        const code = rowData[1].innerText;
        const amount = round(toNumber(rowData[2].innerText));
        const name = rowData[3].innerText;
        const value = round(toNumber(rowData[4].innerText) / amount);
        if (isSimpleData(tableData)) {
          tableData = output({ data: tableData, code, value, name });
        } else {
          tableData = output({ data: tableData, code, value, name });
        }
      }
    }
  }

  return tableData;
};
