
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Smer } from 'src/app/models/smer';
import { SmerService } from 'src/app/services/smer.service';
import { Component, OnInit, Inject} from '@angular/core'; 

@Component({
  selector: 'app-smer-dialog',
  templateUrl: './smer-dialog.component.html',
  styles: [
  ]
})
export class SmerDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
  
    public dialogRef: MatDialogRef<SmerDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Smer,
    public smerService: SmerService ) {
     }


  ngOnInit(): void {

  }

  public addSmer (): void {

      this.smerService.addSmer(this.data).subscribe(() => {
        this.snackBar.open('Upesno dodat smer: '+ this.data.naziv, 'OK', 
         {duration : 2500})
        }),
        (error: Error) => {
          console.log(error.name + ' ' + error.message);
          this.snackBar.open('Doslo je do greske prilikom dodavanja novog smera', 'Zatvori', 
         {duration : 2500
        })

        }

  }

  public updateSmer(): void {

    this.smerService.updateSmer(this.data).subscribe(() => {
      this.snackBar.open('Upesno modifikovan smer: '+ this.data.naziv, 'OK', 
       {duration : 2500})
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske prilikom modifikovanja smera', 'Zatvori', 
       {duration : 2500
        })

      } 

    }

    public deleteSmer() : void {

      this.smerService.deleteSmer(this.data.id).subscribe(() => {
        this.snackBar.open('Upesno obrisan smer: '+ this.data.naziv, 'OK', 
         {duration : 2500})
        }),
        (error: Error) => {
          console.log(error.name + ' ' + error.message);
          this.snackBar.open('Doslo je do greske prilikom brisanja smera', 'Zatvori', 
         {duration : 2500
          })
  
        } 
    }

    public cancel(): void {
      this.dialogRef.close(); 
      this.snackBar.open('Odustali ste.', 'Zatvori', {
        duration: 1000}) 
    }


}


