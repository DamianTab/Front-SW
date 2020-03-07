import { Component, OnInit, Input } from '@angular/core';
import { TableService } from '../../services/tables/table.service';

/* Example:
 * <sw-table></sw-table>
 *
 * Obligatory properties:
 * a) dataType - name of data type in Table Service
 *
 * Optional properties:
 * a) name - table name, it is used for file name during export table
 * b) maxRows - maximum rows per table page
 */
@Component({
  // tslint:disable-next-line
  selector: 'sw-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  private readonly pageMaxNumber: number = 4;
  private cols: any[] = [];
  private rows: any[]; // rows = visible rows + invisible rows
  private data: any[]; // data = visible rows
  private loading: boolean;
  private selectedRows: any[] = [];
  private exportColumns: any;
  private actualPageMaxNumber: number;
  private nextPage = { endpoint: null };

  @Input() readonly name: string = 'untitled';
  @Input() readonly maxRows: number = 10;
  @Input() readonly dataType: string;


  constructor(private dataSource: TableService) {}

  ngOnInit(): void {
    this.actualPageMaxNumber = this.pageMaxNumber;
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.cols = [];
    this.dataSource
      .getData(this.dataType, this.actualPageMaxNumber, this.nextPage)
      .subscribe(data => {
        this.rows = this.extractRows(data);
        this.data = Object.assign([], this.rows);

        const empty = {};
        for (const key of Object.keys(this.rows[0])) {
          empty[key] = null;
        }

        for (let i = 0; i < this.rows.length % this.maxRows; i++) {
          this.rows.push(empty);
        }

        this.loading = false;
      });
  }

  public loadMoreData(): void {
    this.actualPageMaxNumber += this.pageMaxNumber;
    this.loadData();
  }

  public exportCSV(): void {
    const rows = (this.selectedRows.length > 0) ? this.selectedRows : this.data;
    const headers = [this.cols.map(col => col.header).join(',')];

    const csvData = headers
      .concat(
        rows.map(row => {
          const r = [];
          for (const header of Object.keys(row)) {
            r.push(row[header]);
          }

          return r.join(',');
        })
      )
      .join('\n');

    this.saveAsCSVFile(csvData, this.name);
  }

  public exportExcel(): void {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(
        this.selectedRows.length > 0 ? this.selectedRows : this.data
      );
      const workbook = {
        Sheets: {
          data: worksheet
        },
        SheetNames: ['data']
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      this.saveAsExcelFile(excelBuffer, this.name);
    });
  }

  public exportPdf(): void {
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(
          this.exportColumns,
          this.selectedRows.length > 0 ? this.selectedRows : this.data
        );
        doc.save(`${this.name}.pdf`);
      });
    });
  }

  public onRowSelect(event: any): void {
    // check if selected row is empty, if so then deselect it
    const keys = Object.keys(event.data);
    const nullCount = keys
      .map(key => (event.data[key] == null ? 1 : 0))
      .reduce((a, b) => a + b, 0);

    // every field is null (empty row)
    if (nullCount === keys.length) {
      this.selectedRows.splice(this.selectedRows.indexOf(event.data), 1);
    }
  }

  private extractRows(data: any): any {
    const length = data[Object.keys(data)[0]].length;

    // create rows
    const rows = [];
    for (let i = 0; i < length; i++) {
      const row = {};

      for (const key of Object.keys(data)) {
        row[key] = undefined;
      }

      rows.push(row);
    }

    // assign values to rows
    for (const key of Object.keys(data)) {
      this.cols.push({ field: key, header: key });
      for (const colIndx of Object.keys(data[key])) {
        rows[colIndx][key] = data[key][colIndx];
      }
    }

    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));

    return rows;
  }

  private saveAsCSVFile(csvData: string, fileName: string): void {
    const link = document.createElement('a');
    link.setAttribute(
      'href',
      encodeURI('data:text/csv;charset=utf-8,' + csvData)
    );
    link.setAttribute('download', `${fileName}.csv`);
    link.click();
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    });
  }
}
