import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  @Output() cambioVista = new EventEmitter<boolean>();
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { 
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  ingresar(){

  }

  signup() {
    this.cambioVista.emit(true);
  }
}
