import { Component, OnInit } from '@angular/core';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrl: './livres.component.css'
})
export class LivresComponent implements OnInit {

  livres? : Livre[]; 
  apiurl:string='http://localhost:8083/livres/api';

  constructor(private livreService: LivreService , public authService: AuthService) {
    //this.livres=[];
   }
   
  ngOnInit(): void {
    this.chargerLivres();
  }

/**  old 1* */
  /*
  chargerLivres(){
    this.livreService.listeLivre().subscribe(l => {
    console.log(l);
    this.livres = l;
   
    this.livres.forEach((l) => {
      this.livreService
      .loadImage(l.image.idImage)
      .subscribe((img: Image) => {
        l.imageStr = 'data:' + img.type + ';base64,' + img.image;
      });
      });
    });
  }
    */

  /** old 2 */
  /*
  chargerLivres() {
    this.livreService.listeLivre().subscribe(livres => {
      this.livres = livres;
      this.livres.forEach((livre) => {
        if (livre.images && livre.images.length > 0) {
          livre.imageStr = 'data:' + livre.images[0].type + ';base64,' + livre.images[0].image;
        }
      });
    });
  }*/

    chargerLivres(){
      this.livreService.listeLivre().subscribe(livs => {
      this.livres = livs;
      });
      }

 
    
  supprimerLivre(l: Livre) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf && l.idLivre !== undefined) { 
      this.livreService.supprimerLivre(l.idLivre).subscribe(() => {
        console.log("Livre supprimé");
        this.chargerLivres(); 
      });
    }

}
}
 