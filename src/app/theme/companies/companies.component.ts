import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidatorFn, FormGroup, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['../../../assets/icon/icofont/css/icofont.scss']
})
export class CompaniesComponent {

    @ViewChild('assign') assign;
    @ViewChild('modalLarge') modalLarge;
    @ViewChild('table') table;

    public saveBtn: boolean;

    public rowsFilter: Array<any>;
    private tempFilter: Array<any>;
    public form: FormGroup;
    public formUser: FormGroup;
    formAssign: FormGroup;
    public gridPage: boolean = true;
    public submitted: boolean;
    public submittedUser: boolean;

    submittedAssign: boolean;
    forEdit: boolean;
    ruccer: boolean;
    currentRuc = "";
    emailer: boolean;
    currentEmail = ""

    public userSelectedId;

    public countries: Array<any> = [];
    public bussinesses: Array<any> = [];
    public sectors: Array<any> = [];
    public users: Array<any>;

    constructor(public formBuilder: FormBuilder, private api: ApiService, private route: Router) {
        this.form = this.formBuilder.group({
            id: null,
            name: [null, Validators.required],
            sector_id: ["", Validators.required],
            country_id: ["", Validators.required],
            city: [null, Validators.required],
            slug: [null, Validators.required],
            ruc: [null, Validators.required],
            bussiness_id: ["", Validators.required],
            department: [null, Validators.required],
            phone: [null, Validators.required],
            address: [null, Validators.required]
        });

        this.form.controls.ruc.disable()

        this.formUser = this.formBuilder.group({
            first_name: [null, Validators.required],
            last_name: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required],
            generate: false,
            send_credentials: false,
            id: null
        });

        this.formAssign = this.formBuilder.group({
            user_id: [null, Validators.required],
            company_id: [null, Validators.required]
        });

        api.getCompanies(companies => {
            this.refreshRows(companies)
        })
    }

    selectAExitUser(value) {
        console.log(value)

        this.formUser.patchValue({
            first_name: null,
            last_name: null,
            email: null,
            password: null,
            generate: false,
            send_credentials: false,
            id: value
        });

        this.formUser.controls.first_name.disable()
        this.formUser.controls.last_name.disable()
        this.formUser.controls.email.disable()
        this.formUser.controls.password.disable()
        this.formUser.controls.generate.disable()
        this.formUser.controls.send_credentials.disable()
    }

    create() {
        console.log("create")

        this.resetForms()
        this.gridPage = false;

        this.api.getFreeUsers(users => {
            this.users = users
        })

        if (!this.countries.length) {
            this.api.getCountries(countries => {
                this.countries = countries
            })
        }

        if (!this.bussinesses.length) {
            this.api.getBussinesses(bussinesses => {
                this.bussinesses = bussinesses
            })
        }

        if (!this.sectors.length) {
            this.api.getSectors(sectors => {
                this.sectors = sectors
            })
        }
    }

    refreshExitent() {
        this.ruccer = false
    }

    save() {
        this.api.getCompanyByRuc(this.form.value.ruc, company => {
            this.submitted = true;

            this.ruccer = company && company.ruc == this.form.value.ruc && this.currentRuc != this.form.value.ruc

            if (!this.form.valid || this.ruccer) {
                return;
            }

            this.saveBtn = true

            if (this.forEdit) {
                this.api.putCompany(this.form.value.id, this.form.value, (company) => {
                    this.refreshRows(this.rowsFilter.map(com => com.id == company.id ? company : com))

                    this.resetForms()
                })

                return;
            }

            this.api.postCompanyAndUsers({
                company: this.form.value
            }, (company) => {
                this.api.getCompanies(companies => {
                    this.refreshRows(companies)

                    this.resetForms()
                })
            })
        })
    }

    assignUser() {
        this.api.getCompanyByRuc(this.form.value.ruc, company => {
            this.submitted = true;

            this.ruccer = company && company.ruc == this.form.value.ruc && this.currentRuc != this.form.value.ruc

            if (!this.form.valid || this.ruccer) {
                return;
            }

            this.modalLarge.show()
        })       
    }

    saveAndAssignUser() {
        this.api.getuserByEmail(this.formUser.value.email, user => {

            this.submittedUser = true

            this.emailer = user && user.email == this.formUser.value.email && this.currentEmail != this.formUser.value.email

            if (!this.formUser.valid || !this.form.valid || this.emailer) {
                return;
            }

            this.saveBtn = true

            this.api.postCompanyAndUsers({
                company: this.form.value,
                user: this.formUser.value
            }, (data) => {

                this.api.getCompanies(companies => {
                    this.refreshRows(companies)
                    this.gridPage = true

                    this.resetForms()
                })

            })

        })
    }

    enableRuc() {
        this.form.controls.ruc.enable()

        this.form.get('ruc').clearValidators();
        this.form.get('ruc').setValidators([this.rucValidator(this.form.controls.country_id.value), Validators.required]);
        this.form.get('ruc').updateValueAndValidity();
    }


    rucValidator(id): ValidatorFn {

        return (control: AbstractControl) => {
            const value = control.value ? control.value : ''

            if (id == 6 && (value.length != 11 || (!Number.isInteger(Number(value))))) {
                return { 'peru': true }
            }


            if (id != 6 && (value.length > 15 || !value.match(/^[0-9a-z]+$/))) {
                return { 'alpha15': true }
            }

            return null
        }
    }

    alphanumericValidator(): ValidatorFn {

        return (control: AbstractControl) => {
            const value = control.value ? control.value : ''

            if (value.length > 15 || !value.match(/^[0-9a-z]+$/)) {
                return { 'alpha15': true }
            }

            return null
        }
    }

    resetForms() {
        this.modalLarge.hide();

        this.form.reset({
            sector_id: "",
            country_id: "",
            bussiness_id: ""
        })

        this.form.controls.ruc.disable()

        this.form.get('slug').clearValidators();
        this.form.get('slug').setValidators([this.alphanumericValidator(), Validators.required]);

        this.form.get('slug').updateValueAndValidity();

        this.formUser.reset()
        this.submitted = false
        this.submittedUser = false
        this.saveBtn = false
        this.forEdit = false
        this.gridPage = true
        this.currentRuc = ""
    }


    toAsssign(row) {
        this.formAssign.reset({
            company_id: row.id
        })

        this.assign.show()

        this.users = []

        this.api.getFreeUsers(users => {
            this.users = users
        })
    }

    doAssignUser() {
        console.log(this.formAssign.value)
        this.submittedAssign = true
        if (!this.formAssign.valid) {
            return;
        }

        this.assign.hide()
        this.submittedAssign = false

        this.api.putCompany(this.formAssign.value.company_id, this.formAssign.value, (company) => {

            const row = this.rowsFilter.find(u => u.id == this.formAssign.value.company_id)

            const user = this.users.find(u => u.id == this.formAssign.value.user_id)
            console.log(user)

            row.user_first_name = user.first_name
            row.user_last_name = user.last_name

            console.log(row)

            this.refreshRows(this.rowsFilter.map(com => com.id == row.id ? row : com))
        })
    }

    generatePassword() {
        if (this.formUser.controls.generate.value) {
            this.formUser.controls.send_credentials.enable()
            this.formUser.controls.password.enable()

            return;
        }

        this.formUser.patchValue({
            password: this.generateRandomPassword(),
            send_credentials: true
        })

        this.formUser.controls.password.disable()
        this.formUser.controls.send_credentials.disable()
    }

    generateRandomPassword() {
        return '123456'
    }

    backToCompanies() {
        this.gridPage = true
    }

    edit(row) {
        console.log(row)

        this.resetForms()

        this.form.controls.ruc.disable()

        this.forEdit = true

        this.form = this.formBuilder.group({
            id: row.id,
            name: row.name,
            sector_id: row.sector_id,
            country_id: row.country_id,
            city: row.city,
            slug: row.slug,
            ruc: row.ruc,
            bussiness_id: row.bussiness_id,
            department: row.department,
            phone: row.phone,
            address: row.address
        });

        this.currentRuc =  row.ruc

        if (!this.countries.length) {
            this.api.getCountries(countries => {
                this.countries = countries
            })
        }

        if (!this.bussinesses.length) {
            this.api.getBussinesses(bussinesses => {
                this.bussinesses = bussinesses
            })
        }

        if (!this.sectors.length) {
            this.api.getSectors(sectors => {
                this.sectors = sectors
            })
        }

        this.gridPage = false
    }

    changeStatus(row) {
        this.api.putCompany(row.id, { enabled: !row.enabled }, () => {
            console.log("TOGGLED")
            row.enabled = !row.enabled

            this.refreshRows(this.rowsFilter.map(company => company.id == row.id ? row : company))
        })
    }

    refreshRows(rows) {
        this.rowsFilter = rows
        this.tempFilter = [...rows]
    }

    updateFilter(event) {
        const value = event.target.value.toLowerCase();

        const temp = this.tempFilter.filter(function (object) {
            return Object.keys(object).some(key => (object[key] + "").toLowerCase().indexOf(value) !== -1) || !value;
        });

        this.rowsFilter = temp;
        this.table.offset = 0;
    }

}
