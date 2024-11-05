import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
  email: string = '';
  nombre: string = '';
  password: string = '';
  
  ionicForm: FormGroup

  constructor(private toastController: ToastController, public formBuilder:FormBuilder, public loadingController: LoadingController, public authService:AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      nombre :['', [Validators.required]],
      email:['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]],
      password:['',[
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@\\-_?!#%]{8,}$'),
      ]]
    })
  }

  get errorControl(){
    return this.ionicForm?.controls;
  }

  async signUp(){
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.ionicForm.valid) {

      const user = await this.authService.registerUser(this.ionicForm.value.email, this.ionicForm.value.password, this.ionicForm.value.nombre).catch((err) => {
        this.presentToast(err)
        console.log(err);
        loading.dismiss();
      })

      if (user) {
        loading.dismiss();
        this.router.navigate(['/login'])
        
      }
    } else {
      return console.log('Please provide all the required values!');
    }
  }

  async presentToast(message: undefined) {
    console.log(message);
    
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

}