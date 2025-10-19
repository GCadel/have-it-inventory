import { TableRow } from './TableRow';

const TableBody = ({ tableData, addRow, removeRow }) => {
  return (
    <tbody>
      {tableData.map((row) => (
        <TableRow
          rowData={row}
          key={row.id}
          addSelectedRow={addRow}
          removeSelectedRow={removeRow}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
