import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreService } from '../services/livre.service';
import { Livre } from '../model/livre.model';
import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-livre',
  templateUrl: './update-livre.component.html',
  styles: []
})
export class UpdateLivreComponent implements OnInit {
  currentLivre = new Livre();
  genres!: Genre[];
  updatedGenreId!: number;
  myImage! : string;
  uploadedImage!: File;
  isImageUpdated: Boolean=false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private livreService: LivreService
  ) {}

  /* ngOnInit(): void {
    // Fetch the list of genres first
    this.livreService.listeGenres().subscribe(gens => {
      this.genres = gens._embedded.genres;
      console.log('Fetched genres:', this.genres); // Log the fetched genres

      // After fetching genres, fetch the current livre
      this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id']).subscribe(l => {
        this.currentLivre = l;
        console.log('Current livre:', this.currentLivre); // Log the current livre

        // Check if currentLivre has a genre and assign its ID
        if (this.currentLivre.genre) {
          this.updatedGenreId = this.currentLivre.genre.idGenre;
          console.log('Current livre genre ID:', this.updatedGenreId); // Log the genre ID
        } else {
          console.warn('Current livre does not have a genre defined');
        }
      });
    });
  } */


    
          /* 
          if (this.currentLivre.image && this.currentLivre.image.idImage) {
            this.livreService.loadImage(this.currentLivre.image.idImage)
              .subscribe((img: Image) => {
                this.myImage = 'data:' + img.type + ';base64,' + img.image;
              });
          } else {
            console.warn('Current livre does not have an image defined');
          } */


/* 
    ngOnInit(): void {
      // Fetch the list of genres
      this.livreService.listeGenres().subscribe(gens => {
        this.genres = gens._embedded.genres;
        console.log('Fetched genres:', this.genres); // Log the fetched genres
      });
    
      // Fetch the current livre
      this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id'])
        .subscribe(livre => {
          this.currentLivre = livre;
          console.log('Current livre:', this.currentLivre); // Log the current livre
          
          // Assign the genre ID if available
          if (this.currentLivre.genre) {
            this.updatedGenreId = this.currentLivre.genre.idGenre;
            console.log('Current livre genre ID:', this.updatedGenreId); // Log the genre ID
          } else {
            console.warn('Current livre does not have a genre defined');
          }
    
            // Load the image if available
          if (this.currentLivre.image && this.currentLivre.image.idImage) {
            this.livreService.loadImage(this.currentLivre.image.idImage)
              .subscribe((img: Image) => {
                this.myImage = 'data:' + img.type + ';base64,' + img.image;
                console.log('Loaded image:', this.myImage); // Log the image data
              });
          } else {
            console.warn('Current livre does not have an image defined');
          }
        });


        // Fetch the current livre and genre ID if needed
        this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id'])
        .subscribe(l => {
            this.currentLivre = l;
            this.updatedGenreId = l.genre.idGenre;
            console.log('Current livre and genre ID:', this.currentLivre, this.updatedGenreId);
  });
    } */



  ngOnInit(): void {
    this.livreService.listeGenres().
      subscribe(cats => {this.genres = cats._embedded.genres;
    });
    this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id'])
    .subscribe( l =>{ 
      this.currentLivre = l;
      this.updatedGenreId = l.genre.idGenre;
      console.log('Current livre and genre ID:', this.currentLivre, this.updatedGenreId);
    } ) ;
  }
    
/*
  updateLivre() {
    // Ensure that updatedGenreId is defined before updating
    if (this.updatedGenreId) {
      // Find the genre based on updatedGenreId
      const selectedGenre = this.genres.find(g => g.idGenre === Number(this.updatedGenreId));
      
      // Check if the selected genre was found
      if (selectedGenre) {
        this.currentLivre.genre = selectedGenre; // Assign the genre to currentLivre
        
        // Proceed to update the livre
        this.livreService.updateLivre(this.currentLivre).subscribe(
          () => {
            this.router.navigate(['livres']); // Navigate back to the list
          },
          error => {
            console.error('Error updating livre:', error);
          }
        );
      } else {
        console.warn('Selected genre not found for ID:', this.updatedGenreId);
      }
    } else {
      console.warn('Updated genre ID is not defined. Cannot update livre.');
    }
  }
    */




  /*

  updateLivre() {
    // Ensure that updatedGenreId is defined before updating
    if (this.updatedGenreId) {
      // Find the genre based on updatedGenreId
      const selectedGenre = this.genres.find(g => g.idGenre === Number(this.updatedGenreId));
      
      // Check if the selected genre was found
      if (selectedGenre) {
        this.currentLivre.genre = selectedGenre; // Assign the genre to currentLivre
  
        // Check if the image has been updated
        if (this.isImageUpdated) {
          // Upload the new image and assign it to the currentLivre
          this.livreService.uploadImage(this.uploadedImage, this.uploadedImage.name).subscribe((img: Image) => {
            this.currentLivre.image = img;
  
            // Proceed to update the livre with the new image
            this.livreService.updateLivre(this.currentLivre).subscribe(
              () => {
                this.router.navigate(['livres']); // Navigate back to the list
              },
              error => {
                console.error('Error updating livre:', error);
              }
            );
          });
        } else {
          // Update the livre without changing the image
          this.livreService.updateLivre(this.currentLivre).subscribe(
            () => {
              this.router.navigate(['livres']); // Navigate back to the list
            },
            error => {
              console.error('Error updating livre:', error);
            }
          );
        }
      } else {
        console.warn('Selected genre not found for ID:', this.updatedGenreId);
      }
    } else {
      console.warn('Updated genre ID is not defined. Cannot update livre.');
    }
  }
  

*/



updateLivre() {
  this.currentLivre.genre = this.genres.find(g => g.idGenre == this.updatedGenreId)!;
  this.livreService
    .updateLivre(this.currentLivre)
    .subscribe((prod) => {
      this.router.navigate(['livres']);
    });
}

  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    }
  }


  onAddImageLivre() {
    // Ensure that currentLivre.idLivre is defined
    if (this.currentLivre.idLivre) {
      this.livreService
        .uploadImageLiv(this.uploadedImage, this.uploadedImage.name, this.currentLivre.idLivre)
        .subscribe((img: Image) => {
          this.currentLivre.images.push(img);
        });
    } else {
      console.warn('currentLivre.idLivre is undefined');
    }
  }



  supprimerImage(img: Image){
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.livreService.supprimerImage(img.idImage).subscribe(() => {
    //supprimer image du tableau currentLivre.images
        const index = this.currentLivre.images.indexOf(img, 0);
        if (index > -1) {
            this.currentLivre.images.splice(index, 1);
        }
    });
  }
  
  
}
