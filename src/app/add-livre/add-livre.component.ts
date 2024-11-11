import { Component, OnInit } from '@angular/core';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre.service';
import { Genre } from '../model/genre.model';
import { Router } from '@angular/router';
import {Image} from '../model/image.model';

@Component({
  selector: 'app-add-livre',
  templateUrl: './add-livre.component.html',
  styleUrl: './add-livre.component.css'
})
export class AddLivreComponent implements OnInit {
  newLivre = new Livre();
  message: string ="";
  genres! : Genre[];
  newIdGenre! : number;
  newGenre! : Genre;

  uploadedImage!: File;
  imagePath: any;

  constructor(private livreService: LivreService,private router :Router) { }

  ngOnInit(): void {
    this.livreService.listeGenres().subscribe(
      gens => {console.log(gens);
      this.genres = gens._embedded.genres;});
  }

    /*
    addLivre(){
      this.livreService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
      this.newLivre.image=img;
      this.newLivre.genre = this.genres.find(g => g.idGenre
      == this.newIdGenre)!;
      this.livreService
      .ajouterLivre(this.newLivre)
      .subscribe(() => {
      this.router.navigate(['livres']);
      });
    })
  }
    */


  addLivre() {
    this.newLivre.genre = this.genres.find(g => g.idGenre == this.newIdGenre)!;
    
    this.livreService.ajouterLivre(this.newLivre).subscribe((livre) => {
      // Check if livre.idLivre exists before uploading image
      if (livre.idLivre) {
        this.livreService
          .uploadImageFS(this.uploadedImage, this.uploadedImage.name, livre.idLivre)
          .subscribe({
            next: (response: any) => {
              console.log('Image uploaded successfully');
              this.router.navigate(['livres']);
            },
            error: (error) => {
              console.error('Error uploading image:', error);
              // Still navigate even if image upload fails
              this.router.navigate(['livres']);
            }
          });
      } else {
        console.error('Livre ID is undefined');
        this.router.navigate(['livres']);
      }
    });
  }


    onImageUpload(event: any) {
      this.uploadedImage = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = (_event) => { this.imagePath = reader.result; }
    }

    
 

}
