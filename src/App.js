import { useEffect } from "react";
import "./styles.css";
import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";
import * as XLSX from "xlsx";

export default function App() {
  function getSheetData(data, header) {
    var fields = Object.keys(data[0]);
    var sheetData = data.map(function (row) {
      return fields.map(function (fieldName) {
        return row[fieldName] ? row[fieldName] : "";
      });
    });
    sheetData.unshift(header);
    return sheetData;
  }

  async function saveAsExcel() {
    var data = [
      { name: "John", city: "Seattle" },
      { name: "Mike", city: "Los Angeles" },
      { name: "Zach", city: "New York" }
    ];
    let header = ["Name", "City"];

    /* XlsxPopulate.fromBlankAsync().then(async (workbook) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = getSheetData(data, header);
      const totalColumns = sheetData[0].length;

      sheet1.cell("A1").value(sheetData);
      const range = sheet1.usedRange();
      const endColumn = String.fromCharCode(64 + totalColumns);
      sheet1.row(1).style("bold", true);
      sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
      range.style("border", true);
      return workbook.outputAsync().then((res) => {
        saveAs(res, "file.xlsx");
      });
    }); */
    var ws_data = [
      ["Column 1"],
      [1]
    ];
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    
    
    var ws_data2 = [
      ["Column 2"],
      [2]
    ];
    var ws2 = XLSX.utils.aoa_to_sheet(ws_data2);
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS1");
    XLSX.utils.book_append_sheet(wb, ws2, "SheetJS2");
    
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }

  return (
    <button type="button" onClick={saveAsExcel}>
      Download
    </button>
  );
}
