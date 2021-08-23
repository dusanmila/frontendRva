import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Grupa } from 'src/app/models/grupa';
import { Projekat } from 'src/app/models/projekat';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { StudentDialogComponent } from '../dialogs/student-dialog/student-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy, OnChanges {

  displayedColumns = ['id', 'brojIndeksa', 'ime', 'prezime','grupa', 'projekat', 'actions' ];
  dataSource : MatTableDataSource<Student>;
  subscription: Subscription;

  @ViewChild(MatSort, {static : false}) sort :MatSort; 
  @ViewChild(MatPaginator, {static : false}) paginator : MatPaginator;

  //parent child odnos 
@Input () selektovanaGrupa: Grupa; 
  constructor(public studentService : StudentService,
    private dialog: MatDialog) { }

    ngOnDestroy() {
      this.subscription.unsubscribe(); 
    }

    ngOnChanges() {
     
      if(this.selektovanaGrupa.id) {
        this.loadData(); 
      }
    }
  ngOnInit(): void {
    //this.loadData();
  }

  loadData() {
    this.studentService.getStudentiGrupe(this.selektovanaGrupa.id).subscribe(
      data=> {
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.filterPredicate = (data, filter: string) =>{
          const accumulator = (currentTerm, key) => {
            return key === 'projekat' ? currentTerm + data.projekat.id : currentTerm + data[key];
          }
          const dataStr = Object.keys(data).reduce(accumulator,'').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
  
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch(property) {
            case 'projekat': return data.projekat.id;
  
            default: return data[property];
          }
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ),
    (error: Error) => {
      console.log(error.name+' '+error.message);
    }
  }
 public openDialog(flag: number,id?: number, brojIndeksa?: string, ime?:string, prezime?:string, grupa?: Grupa, projekat?: Projekat ) {

    const dialogRef = this.dialog.open(StudentDialogComponent, {data: {id, brojIndeksa, ime, prezime, grupa, projekat}});
   
    dialogRef.componentInstance.flag = flag; 
    if(flag ===1) {
      dialogRef.componentInstance.data.grupa = this.selektovanaGrupa;
     }
    dialogRef.afterClosed().subscribe(res => {
      if(res ==1)
      {
        
        this.loadData(); 
      }}
      );

  }

  applyFilter(filterValue : string) {

    filterValue = filterValue.trim(); 
    //trimuju se spejsovi 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }

}
