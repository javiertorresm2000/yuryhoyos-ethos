import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['../../../assets/icon/icofont/css/icofont.scss']
})
export class UsersComponent implements OnInit {
    @ViewChild('modalLarge') modalLarge;
    @ViewChild('table') table;

    public rowsFilter: Array<any>;
    private tempFilter: Array<any>;
    public form: FormGroup;
    public submitted: boolean;
    private isEditing: boolean;
    public roles: Array<any> = [
        { rol: '', name: 'Perfil' },
        { rol: '1', name: 'Investigador' },
        { rol: '2', name: 'Administrador suplente' },
        { rol: '3', name: 'Consultor' },
    ];

    emailer: boolean;
    currentEmail = ""

    constructor(public formBuilder: FormBuilder, private api: ApiService) {
        this.form = this.formBuilder.group({
            first_name: [null, Validators.required],
            last_name: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            password: null,
            generate: false,
            send_credentials: false,
            id: null
        });

        api.getUsers(users => {
            this.refreshRows(users)
        })


    }

    ngOnInit() { }

    create() {
        this.form.get('password').clearValidators();
        this.form.get('password').setValidators([this.passwordValidator(this.form.controls.id.value)]);
        this.form.get('password').updateValueAndValidity();


        this.api.getuserByEmail(this.form.value.email, existuser => {
            this.submitted = true;

            this.emailer = existuser && existuser.email == this.form.value.email && this.currentEmail != this.form.value.email

            if (!this.form.valid || this.emailer) {
                return;
            }

            this.submitted = false;
            this.modalLarge.hide()

            const user = this.form.value

            this.form.reset({
                rol_id: '',
                password: ''
            })

            if (!user.id) {

                this.api.postUser(user, (user) => {
                    console.log(user)
                    this.refreshRows(this.rowsFilter.concat(user))
                    this.table.offset = 0;
                })

            } else {
                this.api.putUser(user.id, user, updatedUser => {
                    console.log(updatedUser)
                    this.refreshRows(this.rowsFilter.map(u => u.id == user.id ? user : u))
                })
            }
        })
    }


    changeStatus(row) {
        this.api.putUser(row.id, { enabled: !row.enabled }, () => {
            row.enabled = !row.enabled

            const rows = this.rowsFilter.map(user => {
                if (user.company_id == row.company_id) {
                    user.enabled = false
                }

                return user
            }).map(user => {
                if (user.id == row.id) {
                    user.enabled = true
                }

                return user
            })

            this.refreshRows(rows)
        })
    }

    edit(row) {
        this.isEditing = true
        this.submitted = false

        this.form.patchValue({
            id: row.id,
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email,
            rol_id: row.rol_id,
            password: '',
            generate: false,
            send_credentials: false
        })

        this.currentEmail = row.email

        this.modalLarge.show()
    }

    remove(row) {
        this.rowsFilter = this.rowsFilter.filter(e => e.id != row.id)
    }

    refreshRows(rows) {
        this.rowsFilter = rows
        this.tempFilter = [...rows]
    }

    createUser() {
        this.currentEmail = ""
        console.log("RESET EDIT")

        if (this.isEditing) {
            this.form.reset({
                rol_id: '',
                password: ''
            })

            this.isEditing = false
        }

        this.modalLarge.show()
    }

    generatePassword() {
        if (this.form.controls.generate.value) {
            return this.form.controls.password.enable();
        }

        this.form.patchValue({ password: this.generateRandomPassword() })
        this.form.controls.password.disable()
    }

    generateRandomPassword() {
        return '123456'
    }

    updateFilter(event) {
        const value = event.target.value.toLowerCase();

        const temp = this.tempFilter.filter(function (object) {
            return Object.keys(object).some(key => (object[key] + "").toLowerCase().indexOf(value) !== -1) || !value;
        });

        this.rowsFilter = temp;
        this.table.offset = 0;
    }

    passwordValidator(id): ValidatorFn {
        return (control: AbstractControl) => (id != null || control.value.length > 0) ? null : { 'empty': true }
    }
}
