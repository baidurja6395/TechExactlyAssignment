import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private gridApi!: GridApi<any>;
  public themeClass: string = "ag-theme-quartz-dark";
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[] = [];
  public colDefs: any = [
    {
      field: 'Kind',
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      field: 'Etag',
      cellRenderer:
        function (params: any) {
          return `<a href="${params.value.split('*')[0]}" target="_blank">${params.value.split('*')[1]}</a>`
        }
    }
  ];
  public selectedRowData: any = []
  public apiData: any = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyAoglyA2YKT_Ia5QYPiv05T5t04uzJksKA').subscribe((res: any) => {
      res.items.forEach((element: any) => {
        const tempData = {
          Kind: element.kind,
          Etag: `https://www.youtube.com/watch?v=${element.id.videoId}*${element.etag}`
        }
        this.apiData.push(tempData)
      });
    })
  }

  onSelectionChanged(ev: any) {
    this.selectedRowData = this.gridApi.getSelectedRows();
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = this.apiData;
  }
}

