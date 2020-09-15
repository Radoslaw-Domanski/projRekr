import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { JsonService } from 'src/app/services/json.service';
import { Column, ExampleJSON } from '../json/json';
import { DynamicGridConfig } from './dynamic-grid';

@Component({
  selector: 'app-dynamic-grid',
  templateUrl: './dynamic-grid.component.html',
  styleUrls: ['./dynamic-grid.component.scss']
})
export class DynamicGridComponent implements OnChanges {

  @Input() gridConfig: DynamicGridConfig
  @Input() allColumns: Column[] = []
  @ViewChild('dataGrid', {static: true}) dataGrid: DxDataGridComponent;

  rowData: {} = {}
  toolbarItems: {}[] = []
  filteredColumns: string[] = []
  filteredData: {}[] = []

  constructor(private jsonService: JsonService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.gridConfig){
      const filteredJSON: any = this.jsonService.getFilteredJSON(this.gridConfig)
      this.filteredColumns = filteredJSON.filteredColumns.map(column=>column.headerName)
      this.filteredData = filteredJSON.data
      notify("Dynamic grid has been built","success", 1000)
    }
    else{
      this.filteredData = []
      this.filteredColumns = []
    }
  }
  
  onCellPrepared(event: any): void{
    if(event.rowType === 'data' && event.column.command === "edit"){
      event.cellElement.lastElementChild.innerText = "Details"
    }
  }

  onInitialized(): void{
    const toolbarItem: {} = {  
      widget: 'dxButton',  
      location: 'after',  
      options: {  
        text: 'OK'
      },  
      toolbar: 'bottom',  
      onClick: this.dataGrid.instance.cancelEditData
    }
    this.toolbarItems.push(toolbarItem)
  }

  onEditingStart(e: any): void{
    this.rowData = this.jsonService.getSingleDataRow(e.data.id)
  }

}