import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Projekat } from 'src/app/models/projekat';
import {ProjekatService} from 'src/app/services/projekat.service';
import { ProjekatDialogComponent } from '../dialogs/projekat-dialog/projekat-dialog.component';

@Component({
  selector: 'app-projekat',
  templateUrl: './projekat.component.html',
  styleUrls: ['./projekat.component.css']
})
export class ProjekatComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  displayedColumns = ['id', 'naziv', 'opis', 'oznaka','actions'];
  dataSource: MatTableDataSource<Projekat>;


//komunikacija izmedju html i ts
@ViewChild(MatSort, {static : false}) sort :MatSort; 
@ViewChild(MatPaginator, {static : false}) paginator : MatPaginator;

  constructor(private projekatService : ProjekatService,
    private dialog: MatDialog) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData(); 

  }

  public loadData() {
    this.subscription = this.projekatService.getAllProjekti().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort; 
        this.dataSource.paginator = this.paginator;
      }
    ),

    (error: Error) => {
      console.log(error.name+' '+error.message)
    }
  }

  public openDialog(flag: number, id?: number, naziv?:string, opis?:string, oznaka?:string) :void {

    const dialogRef = this.dialog.open (ProjekatDialogComponent, {data: {id,naziv, opis, oznaka}});
    dialogRef.componentInstance.flag = flag; 
    dialogRef.afterClosed().subscribe(res => {
      if(res==1)
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
