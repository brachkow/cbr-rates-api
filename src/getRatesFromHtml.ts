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
        const code = rowData[1].innerText;
        const amount = Number(rowData[2].innerText);
        const name = rowData[3].innerText;
        const value = Number(rowData[4].innerText) / amount;
        const dataObject = {
          code,
          name,
          value,
        };
        tableData.push(dataObject);
      }
    }
  }

  return tableData;
};
