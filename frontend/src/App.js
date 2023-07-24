import React, { useState, useRef, useEffect } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { PDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import axios from 'axios';


function App() {
  const [data, setData] = useState([]);
  const pdfExportComponent = useRef(null);
  const excelExportComponent = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="app-container">
      <h1>Data from MongoDB</h1>

      <div className="export-buttons">
        <button className="exportButton" onClick={() => pdfExportComponent.current.save()}>Export as PDF</button>
        <button className="exportButton" onClick={() => excelExportComponent.current.save()}>Export as Excel</button>
      </div>

      <PDFExport ref={pdfExportComponent} paperSize="Letter" landscape={true} scale={0.7}>
      <Grid
        className="grid-style"
        data={data}
      >
          <Column field="txnDate" title="txnDate" width="160px" />
          <Column field="valueDate" title="valueDate" width="160px" />
          <Column field="description" title="description" width="160px" wrap={true}  />
          <Column field="reference" title="reference" width="160px" />
          <Column field="debits" title="debits" width="160px" />
          <Column field="credits" title="credits" width="160px" />
          <Column field="balance" title="balance" width="160px" />
        </Grid>
      </PDFExport>

      {/* Excel Export */}
      <ExcelExport data={data} ref={excelExportComponent}>
        <Grid
          className="grid-style"
          data={data}
        >
          {/* Columns */}
          <Column field="txnDate" title="txnDate" width="150px" />
          <Column field="valueDate" title="valueDate" width="150px" />
          <Column field="description" title="description" />
          <Column field="reference" title="reference" width="150px" />
          <Column field="debits" title="debits" width="150px" />
          <Column field="credits" title="credits" width="150px" />
          <Column field="balance" title="balance" width="150px" />
        </Grid>
      </ExcelExport>
    </div>
  );
}

export default App;
