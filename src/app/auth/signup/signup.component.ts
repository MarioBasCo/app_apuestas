import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Output() cambioVista = new EventEmitter<boolean>();
  regForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.regForm = this.fb.group({
      usuario: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  guardarRegistro(){

  }
  
  signin() {
    this.cambioVista.emit(false);
  }

}
