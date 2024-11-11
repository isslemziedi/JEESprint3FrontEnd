import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html'
})

export class VerifEmailComponent implements OnInit{
  code:string="";
  user:User=new User();
  err: string = ''; 

  constructor(private route:ActivatedRoute,private authService:AuthService,private router:Router) {}
  ngOnInit(): void {
    this.user =this.authService.regitredUser;
  }

  /* onValidateEmail(){
    this.authService.validateEmail(this.code).subscribe({
    next : (res)=> {
      alert('Login successful');
      this.authService.login(this.user).subscribe({
        next: (data) => {
          let jwToken = data.headers.get('Authorization')!;
          this.authService.saveToken(jwToken);
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    error: (err: any) => {
      
      if(err.status=400){
        this.err= err.error.message;
      }
        
        console.log(err.errorCode);
    }
  }
  });
} */


  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
        next: (res) => {
            alert('Login successful');
            this.authService.login(this.user).subscribe({
                next: (data) => {
                    let jwToken = data.headers.get('Authorization')!;
                    this.authService.saveToken(jwToken);
                    this.router.navigate(['/']);
                },
                error: (err: any) => {
                    console.log(err);
                }
            });
        },
        error: (err: any) => {
            // Check for specific error status and set error message
            if (err.status === 400) {  // 400 bad request
                if (err.error.errorCode === "INVALID_TOKEN") {
                    this.err = "Votre Code n'est pas valide!";
                } else if (err.error.errorCode === "EXPIRED_TOKEN") {
                    this.err = "Votre code a expiré!";
                } else {
                    this.err = "An error occurred. Please try again.";
                }
            } else {
                this.err = "An unexpected error occurred. Please try again.";
            }
            console.log(this.err); // Debugging to ensure `err` is being set correctly
        }
    });
}



}