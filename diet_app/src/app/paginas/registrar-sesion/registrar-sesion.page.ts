import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirebaseSignUpService } from 'src/app/servicios/firebase-sign-up.service';

@Component({
  selector: 'app-registrar-sesion',
  templateUrl: './registrar-sesion.page.html',
  styleUrls: ['./registrar-sesion.page.scss'],
})
export class RegistrarSesionPage implements OnInit {
  email: string = '';
  password: string = '';  
  user: string = '';

  ionicForm!: FormGroup

  constructor(
    private toastController: ToastController,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public signUp: FirebaseSignUpService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.pattern
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@\\-_?!#%]{8,}$')
        ]
      ],
      user: ['', 
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
    })
  }

  get errorControl(){
    return this.ionicForm?.controls;
  }

  async registrar(){
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.ionicForm.valid) {

      const user = await this.signUp.registerUser(this.ionicForm.value.email, this.ionicForm.value.password, this.ionicForm.value.nombre).catch((err) => {
        this.presentToast(err)
        console.log(err);
        loading.dismiss();
      })

      if (user) {
        loading.dismiss();
        this.router.navigate(['/iniciar-sesion'])
      }
    } else {
      loading.dismiss();
      this.presentToastError('Por favor llene correctamente todos los campos')
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

  async presentToastError(message: string) {
    console.log(message);
    
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'middle',
    });

    await toast.present();
  }

}
