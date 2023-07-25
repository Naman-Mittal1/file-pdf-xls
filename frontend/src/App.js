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

      <PDFExport margin={{ top: 10, left: 10, right: 10, bottom: 20 }} ref={pdfExportComponent} paperSize="Letter" landscape={true} scale={0.6}>
      <Grid
        className="grid-style"
        data={data}
      >
          <Column field="txnDate" title="txnDate" width="180px" />
          <Column field="valueDate" title="valueDate" width="180px" />
          <Column field="description" title="description" width="180px" wrap={true}  />
          <Column field="reference" title="reference" width="180px" />
          <Column field="debits" title="debits" width="180px" />
          <Column field="credits" title="credits" width="180px" />
          <Column field="balance" title="balance" width="180px" />
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
