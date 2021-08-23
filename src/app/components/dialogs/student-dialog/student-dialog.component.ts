import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Grupa } from 'src/app/models/grupa';
import { Projekat } from 'src/app/models/projekat';
import { Smer } from 'src/app/models/smer';
import { Student } from 'src/app/models/student';
import { GrupaService } from 'src/app/services/grupa.service';
import { ProjekatService } from 'src/app/services/projekat.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit, OnDestroy{

  public flag : number;
  projekti : Projekat[]; 
  grupe : Grupa[];
  projekatSubscription: Subscription;
  grupaSubscription: Subscription;

  constructor(
    @Inject (MAT_DIALOG_DATA) public data: Student,
    public projekatService : ProjekatService,
    public studentService: StudentService,
    public grupaService : GrupaService,
    public snackBar : MatSnackBar,
    public dialogRef : MatDialogRef<StudentDialogComponent>
  ) { }

  ngOnDestroy() : void {
    this.projekatSubscription.unsubscribe(); 
  }

  ngOnInit(): void {
    //ovde odmah punimo niz 
    this.projekatSubscription = this.projekatService.getAllProjekti().subscribe(
      data => { this.projekti = data; 
      }
    ),
    (error: Error) => 
    {
      console.log(error.name+' '+error.message);
    };

    this.grupaSubscription = this.grupaService.getAllGrupe().subscribe(
      data => {this.grupe = data}
    ),
    (error: Error) =>
    {
      console.log(error.name+' '+error.message);
    };
  }

  compareTo (a,b) {
    return a.id == b.id; 
  }

  public addStudenti(): void {
    this.studentService.addStudenti(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspesno dodat student ' + this.data.ime+this.data.prezime, 'OK', {
        duration: 2500
      });
    }),
    
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja studenta: ' + this.data.ime+' '+this.data.prezime, 'Zatvori', {
        duration: 2500
      })
    }
  }

  
  public updateStudenti(): void {
    this.studentService.updateStudenti(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspesno izmenjeni podaci o studentu '  + this.data.ime+' '+this.data.prezime, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene podataka o studentu ' + this.data.ime+' '+this.data.prezime, 'Zatvori', {
        duration: 2500
      })
    }
  }

  
  public deleteStudenti(): void {
    this.studentService.deleteStudenti(this.data.id)
    .subscribe(() => {
      this.snackBar.open('Uspesno obrisan student: ' + this.data.ime+' '+this.data.prezime, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja studenta: '  + this.data.ime+this.data.prezime, 'Zatvori', {
        duration: 2500
      })
    }
  }

  public cancel() : void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Zatvori', {duration:1000})
  }



}
