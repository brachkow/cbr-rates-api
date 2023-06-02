import { Rate } from './types';

const TABLE_ROW_SELECTOR = '.data tr';

export const getRatesFromHtml = (html: string): Rate[] => {
  const tableRows = document.querySelectorAll(TABLE_ROW_SELECTOR);
  const tableData: Rate[] = [];

  if (tableRows) {
    for (let i = 1; i < tableRows.length; i++) {
      const row = tableRows[i];
      const rowData = row.getElementsByTagName('td');
      if (rowData.length > 0) {
        const dataObject = {
          code: rowData[1].innerText,
          amount: Number(rowData[2].innerText),
          name: rowData[3].innerText,
          value: Number(rowData[4].innerText),
        };
        tableData.push(dataObject);
      }
    }
  }

  return tableData;
};
