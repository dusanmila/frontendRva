import { Component, Inject, OnInit, ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__ } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Grupa } from 'src/app/models/grupa';
import {Smer} from 'src/app/models/smer';
import { GrupaService } from 'src/app/services/grupa.service';
import { SmerService } from 'src/app/services/smer.service';
@Component({
  selector: 'app-grupa-dialog',
  templateUrl: './grupa-dialog.component.html',
  styleUrls: ['./grupa-dialog.component.css']
})
export class GrupaDialogComponent implements OnInit {

  public flag:number;
  smerovi: Smer[]; 

  constructor(public smerService : SmerService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GrupaDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Grupa,
    public grupaService : GrupaService) { }

  ngOnInit(): void {
   
    this.smerService.getAllSmerovi().subscribe(
      data => {
        this.smerovi = data;
      }
    );
    }

    compareTo(a ,b) {
      return a.id == b.id;
    }


    public addGrupa(): void {
      this.grupaService.addGrupa(this.data)
      .subscribe(() => {
        this.snackBar.open('Grupa uspešno dodata: ' + this.data.oznaka, 'OK', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' +error.message);
        this.snackBar.open('Došlo je do greške prilikom dodavanja grupe: ' + this.data.oznaka, 'Zatvori', {
          duration: 2500
        })
      }
    }

    
    public updateGrupa(): void {
      this.grupaService.updateGrupa(this.data)
      .subscribe(() => {
        this.snackBar.open('Grupa uspešno izmenjena: ' + this.data.oznaka, 'OK', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' +error.message);
        this.snackBar.open('Došlo je do greške prilikom izmene grupe: ' + this.data.oznaka, 'Zatvori', {
          duration: 2500
        })
      }
    }

    
    public deleteGrupa(): void {
      this.grupaService.deleteGrupa(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Grupa uspešno obrisana: ' + this.data.oznaka, 'OK', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' +error.message);
        this.snackBar.open('Došlo je do greške prilikom brisanja grupe: ' + this.data.oznaka, 'Zatvori', {
          duration: 2500
        })
      }
    }

    public cancel() : void {
      this.dialogRef.close();
      this.snackBar.open('Odustali ste', 'Zatvori', {duration:1000})
    }



}
