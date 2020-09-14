import { Injectable } from '@angular/core';
import * as JSONData from './exampleFile.json';
import { Observable, of } from 'rxjs';
import { DynamicGridConfig } from '../components/dynamic-grid/dynamic-grid';
import { Column } from '../components/json/json'

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  availableTypes: {}[] = [
    {
      displayExpr: "any type",
      valueExpr: ""
    },
    {
      displayExpr: "string",
      valueExpr: "string"
    },
    {
      displayExpr: "number",
      valueExpr: "number"
    }
  ]

  constructor() { }

  getAllColumns(): Observable<any>{
    return of({columns: JSONData.columns});
  }

  getJSONData(): Observable<any>{
    return of({data: JSONData.data});
  }

  getAvailableTypes(): {}[]{
    return this.availableTypes
  }


  getSingleDataRow(id: number): {}{
    return { ...JSONData.data.find((row: any)=>row.id === id) || {} }
  }

  getFilteredJSON(gridConfig: DynamicGridConfig): {}{
    let filteredColumns: Column[] = JSONData.columns
    let data: {}[] = JSONData.data
    // filter columns
    if(gridConfig.headerName.length || gridConfig.type.length){
      filteredColumns = filteredColumns.filter((column: Column)=>
        column.headerName.indexOf(gridConfig.headerName) > -1 && 
        column.type.indexOf(gridConfig.type) > -1)
    }

    // add missing id
    if(!filteredColumns.some((column: Column)=>column.headerName === "id")){
      filteredColumns.unshift({ headerName: "id", type: "number" })
    }

    // filter data
    if(gridConfig.value.length){
      data = data.filter((row: Object)=>{
        const keys: string[] = filteredColumns.map((column: Column)=>column.headerName)
        for(let key of keys){
          if(typeof row[key] === 'string'){
            if(row[key].indexOf(gridConfig.value) > -1) return true
          }else if(typeof row[key] === 'number'){
            if(row[key] === parseInt(gridConfig.value)) return true
          }
        }
        return false
      })
    }

    // map data to equal cols
    data = data.map((row)=>{
      let newRow: {} = {}
      for(let column of filteredColumns){
        newRow[column.headerName] = row[column.headerName]
      }
      return newRow
    })

    return {
      filteredColumns,
      data
    }
  }

}