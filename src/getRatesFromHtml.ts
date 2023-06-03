import { Data, SimpleData, FullData, Rate } from './types';
import { parseHTML } from 'linkedom/worker';
import { toNumber } from './utils/toNumber';
import { round } from './utils/round';

const TABLE_ROW_SELECTOR = '.data tr';

export const simpleOutputGenerator = ({ data, code, value }: { data: SimpleData; code: string; value: number }): SimpleData => {
  data[code] = value;

  return data;
};

export const fullOutputGenerator = ({
  data,
  code,
  value,
  name,
}: {
  data: FullData;
  code: string;
  value: number;
  name: string;
}): FullData => {
  data[code] = {
    code,
    name,
    value,
  };

  return data;
};

type OutputGenerator = typeof simpleOutputGenerator | typeof fullOutputGenerator;

enum OutputMode {
  SIMPLE = 'simple',
  FULL = 'full',
  DEFAULT = 'default',
}

const isFullData = (outputMode: OutputMode, data: ReturnType<OutputGenerator>): data is FullData => {
  return [OutputMode.DEFAULT, OutputMode.FULL].includes(outputMode);
};

export const getRatesFromHtml = (html: string, outputMode: OutputMode = OutputMode.DEFAULT): Data => {
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
        if (isFullData(outputMode, tableData)) {
          tableData = fullOutputGenerator({ data: tableData, code, value, name });
        } else if (outputMode === OutputMode.SIMPLE) {
          tableData = simpleOutputGenerator({ data: tableData, code, value });
        }
      }
    }
  }

  return tableData;
};
