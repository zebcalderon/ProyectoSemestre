import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
  correo: string = '';
  nombre: string = '';
  password: string = '';
  
  regForm: FormGroup

  constructor(public formBuilder:FormBuilder, public loadingController: LoadingController, public authService:AuthenticationService) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      name :['', [Validators.required]],
      email:['', [
        Validators.required,
        Validators.email,
        Validators.pattern("a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
      ]],
      password:['',[
        Validators.required,
        Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
      ]]
    })
  }

  get errorControl(){
    return this.regForm?.controls;
  }

  async signUp(){
    const loading = await this.loadingController.create();
    await loading.present();
    if(this.regForm?.valid){
      // const user = await this.authService.registerUser(email, password)
    }
  }

}