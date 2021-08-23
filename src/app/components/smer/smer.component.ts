import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Smer } from 'src/app/models/smer';
import { SmerService } from 'src/app/services/smer.service';
import { SmerDialogComponent } from '../dialogs/smer-dialog/smer-dialog.component';

@Component({
  selector: 'app-smer',
  templateUrl: './smer.component.html',
  styleUrls: ['./smer.component.css']
})
export class SmerComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  displayedColumns = ['id', 'naziv', 'oznaka', 'actions'];
  dataSource: MatTableDataSource<Smer>;

  @ViewChild(MatSort, {static : false}) sort :MatSort; 
  @ViewChild(MatPaginator, {static : false}) paginator : MatPaginator;

  constructor(private smerService: SmerService,
    private dialog: MatDialog) { }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.loadData();
  }

  public loadData() {

    this.subscription = this.smerService.getAllSmerovi().subscribe(
      data => {
        this.dataSource= new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

      ),

      (error: Error) => {
        console.log(error.name +' '+ error.message)
      }
    

   

  }

  public openDialog(flag: number, id? : number, naziv? : string, oznaka? : string): void {
    const dialogRef = this.dialog.open(SmerDialogComponent, {data: {id,naziv,oznaka}} );
   
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(res => {
      if(res===1)
      {
        this.loadData(); 
      }
    })
  }

  applyFilter(filterValue : string) {

    filterValue = filterValue.trim(); 
    //trimuju se spejsovi 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }


}
