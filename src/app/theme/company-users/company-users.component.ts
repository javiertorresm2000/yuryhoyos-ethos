import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/user';
import { endTimeRange } from '@angular/core/src/profile/wtf_impl';

@Component({
    selector: 'app-company-users',
    templateUrl: './company-users.component.html',
    styleUrls: [
        '../../../assets/icon/icofont/css/icofont.scss'
    ]
})
export class CompanyUsersComponent implements OnInit {
    @ViewChild('modalLarge') modalLarge;
    @ViewChild('table') table;

    public rowsFilter: Array<any>;
    private tempFilter: Array<any>;
    public form: FormGroup;
    public submitted: boolean;
    private isEditing: boolean;
    public roles: Array<any> = [
        { rol: '', name: 'Perfil' },
        { rol: '4', name: 'Investigador' },
        { rol: '2', name: 'Administrador suplente' },
        { rol: '3', name: 'Consultor' },
    ];

    public hide = true;

    emailer: boolean;
    currentEmail = ""

    constructor(public formBuilder: FormBuilder, private api: ApiService) {
        this.form = this.formBuilder.group({
            first_name: [null, Validators.required],
            last_name: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            password: null,
            rol_id: ['', Validators.required],
            generate: false,
            send_credentials: false,
            id: null,
            start: [null, Validators.required],
            end: [null, Validators.required]
        });

        this.form.controls.start.disable();
        this.form.controls.end.disable();

        this.api.getCompanyUsers(users => {

            this.refreshRows(users.map(u => {
                u.rol_id = u.rol
                u.rol = this.roles.find(r => r.rol == u.rol_id).name
                return u
            }))
        })
    }

    ngOnInit() { }


    adminTempChoose(rol) {
        if (User.ROL_ADMIN_PERISHABLE == rol) {
            this.form.controls.start.enable();
            this.form.controls.end.enable();
            this.hide = false
        } else {
            this.hide = true
            this.form.controls.start.disable();
            this.form.controls.end.disable();
            this.form.patchValue({
                start: null,
                end: null
            })
        }
    }

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
                this.api.postCompanyUser(user, (user) => {
                    user.rol_id = user.rol
                    user.rol = this.roles.find(r => r.rol == user.rol_id).name

                    this.refreshRows(this.rowsFilter.concat(user))
                    this.table.offset = 0;
                })

            } else {
                this.api.putCompanyUser(user.id, user, () => {
                    user.rol = this.roles.find(r => r.rol == user.rol_id).name

                    this.refreshRows(this.rowsFilter.map(u => u.id == user.id ? user : u))
                })
            }
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
            send_credentials: false,
            start: row.start,
            end: row.end
        })

        this.currentEmail = row.email

        if (User.ROL_ADMIN_PERISHABLE == row.rol_id) {
            this.form.controls.start.enable();
            this.form.controls.end.enable();
            this.hide = false
        } else {
            this.hide = true
            this.form.controls.start.disable();
            this.form.controls.end.disable();
        }

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
        this.hide = true
        this.submitted = false;

        this.currentEmail = ""

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
            this.form.controls.send_credentials.enable()
            return this.form.controls.password.enable();
        }

        this.form.patchValue({
            password: this.generateRandomPassword(),
            send_credentials: true
        })
        this.form.controls.password.disable()
        this.form.controls.send_credentials.disable()
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

        return (control: AbstractControl) => {
            const len = control.value ? control.value.length : 0
            return (id != null || len > 0) ? null : { 'empty': true }
        }
    }
}
