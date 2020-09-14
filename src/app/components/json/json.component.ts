import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import notify from 'devextreme/ui/notify';
import { JsonService } from 'src/app/services/json.service';
import { DynamicGridConfig } from '../dynamic-grid/dynamic-grid';
import { Column, ExampleJSON } from './json';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent implements OnInit {

  gridConfig: DynamicGridConfig
  columns: Column[] = []
  popupVisible: boolean = false
  availableTypes: {}[] = []
  columnForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private jsonService: JsonService) { 
    this.availableTypes = this.jsonService.getAvailableTypes()
    this.columnForm = this.formBuilder.group({
      headerName: [''],
      type: [''],
      value: ['']
    })
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void{
    this.jsonService.getAllColumns().pipe(
        map((res: ExampleJSON)=>res.columns)
      )
      .subscribe((res: Column[])=>{
        this.columns = res
      },()=>{
        notify("An error occured while getting JSON data","error", 2000)
      })
  }

  displayJSON(): void{
    this.popupVisible = true
  }

  onSubmit(){
    this.gridConfig = this.columnForm.value
  }
}