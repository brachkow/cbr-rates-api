import { Rate, Data } from './types';
import { parseHTML } from 'linkedom/worker';

const TABLE_ROW_SELECTOR = '.data tr';

const toNumber = (value: string): number => {
  return parseFloat(value.replace(',', '.'));
};

const round = (value: number, n: number = 5): number => {
  return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
};

export const getRatesFromHtml = (html: string): Data => {
  const { document } = parseHTML(html);
  const tableRows = document.querySelectorAll(TABLE_ROW_SELECTOR);
  const tableData: Data = {};

  if (tableRows) {
    for (let i = 1; i < tableRows.length; i++) {
      const row = tableRows[i];
      const rowData = row.getElementsByTagName('td');
      if (rowData.length > 0) {
        const code = rowData[1].innerText;
        const amount = round(toNumber(rowData[2].innerText));
        const name = rowData[3].innerText;
        const value = round(toNumber(rowData[4].innerText) / amount);
        const dataObject: Rate = {
          code,
          name,
          value,
        };
        tableData[code] = dataObject;
      }
    }
  }

  return tableData;
};
