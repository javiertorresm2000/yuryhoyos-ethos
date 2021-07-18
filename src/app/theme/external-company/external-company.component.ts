import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';

@Component({
    selector: 'app-external-company',
    templateUrl: './external-company.component.html'
})
export class ExternalCompanyComponent implements OnInit {
    public company: any = null

    ngOnInit() {
        const companyRoute = this.route.snapshot.paramMap.get('company');

        this.api.getCompany(companyRoute, company => {
            if (company == null) {
                return this.router.navigate(['/start'])
            }

            this.api.getExternalOffices(company.id, offices => {
                this.officeRows = offices.filter(e => !!e.enabled)
            })
    
            this.api.getExternalAreas(company.id, areas => {
                this.areaRows = areas.filter(e => !!e.enabled)
            })
    
            this.api.getExternalCategories(company.id, categories => {
                this.categoryRows = categories.filter(e => !!e.enabled)
            })        

            console.log(company)
            this.company = company
        })
    }

    public idDenuncia = 0


    @ViewChild('modalLarge') modalLarge;
    @ViewChild('modalDenouncementCode') modalDenouncementCode;
    @ViewChild('table') table;
    @ViewChild('wizard') wizard;

    public uploader: FileUploader;

    public rowsFilter: Array<any>;
    private tempFilter: Array<any>;
    public form: FormGroup;
    private isEditing: boolean;

    public categoryRows: Array<any>;
    public officeRows: Array<any>;
    public areaRows: Array<any>;
    public sourceRows: Array<any>;

    public anonymus: boolean;

    public step1: boolean;
    public step2: boolean;
    public step3: boolean;
    public sended: boolean;
    public submitted: boolean;

    public uploadedImages: Array<string> = [];

    public showCreateButton: boolean = true;

    constructor(
        public formBuilder: FormBuilder,
        public router: Router,
        private api: ApiService,
        private route: ActivatedRoute
    ) {
        this.uploader = new FileUploader({
            url: api._host() + 'upload',
            maxFileSize: 10485760,
            queueLimit: 10,
            removeAfterUpload: true
        });

        this.uploader.onAfterAddingFile = (fileItem: FileItem)=> {
            console.log("added")
            console.log(fileItem.file.type)
            if (fileItem.file.type == 'application/x-msdownload') {
                fileItem.remove()
            }
        }

        this.form = this.formBuilder.group({

            category_id: [null, Validators.required],
            area_id: [null, Validators.required],
            office_id: [null, Validators.required],
            relationship: [null, Validators.required],


            people: [null, Validators.required],
            description: [null, Validators.required],

            terms_and_conditions: [null, Validators.requiredTrue],
            
            first_name: null,
            job: null,
            phone: null,
            last_name: null,
            email: [null, [Validators.required, Validators.email]],

        });
    }

    create() {
        this.modalLarge.show()
    }

    sendAnonymus() {
        if (this.anonymus) {
            this.form.controls.first_name.enable();
            this.form.controls.job.enable();
            this.form.controls.phone.enable();
            this.form.controls.last_name.enable();
        } else {
            this.form.patchValue({
                first_name: null,
                job: null,
                phone: null,
                last_name: null
            })
            this.form.controls.first_name.disable();
            this.form.controls.job.disable();
            this.form.controls.phone.disable();
            this.form.controls.last_name.disable();
        }
        this.anonymus = !this.anonymus
    }

    see(row) {
        console.log(row)

        this.router.navigate(['/denouncement/' + row.id])
    }

    private refreshRows(rows) {
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

    upload() {
        this.uploader.queue.forEach(file => {
            file.upload()
            file.onSuccess = (response: string, status: number, headers: any) => {
                this.uploadedImages.push(response)
            }
        })
    }

    wizzardStep1() {
        console.log("MOVE TO 1")
        this.step1 = true

        if (
            !this.form.controls.category_id.errors &&
            !this.form.controls.area_id.errors &&
            !this.form.controls.office_id.errors
        ) {
            this.wizard.model.navigationMode.goToStep(1)
        }
    }
    wizzardStep2() {
        console.log("MOVE TO 2")
        this.step2 = true
        if (
            !this.form.controls.people.errors &&
            !this.form.controls.description.errors
        ) {
            this.wizard.model.navigationMode.goToStep(2)
        }

    }
    wizzardStep3() {
        console.log("MOVE TO 3")
        this.step3 = true
        console.log(this.uploader.queue)

        this.wizard.model.navigationMode.goToStep(3)
    }

    send() {
        this.sended = true

        if (this.form.valid) {
            console.log("submitted")
            this.submitted = true

            if (this.uploader.queue.length > 0) {
                this.upload()
                this.uploader.onCompleteAll = () => {
                    this.sender()
                }
            } else {
                this.sender()
            }

        }
    }

    private sender() {
        this.api.postExternalDenouncements({
            evidences: this.uploadedImages,
            denouncement: this.form.value,
            company_id: this.company.id
        }, (denouncement) => {
            this.idDenuncia = denouncement.id

            this.modalLarge.hide()
            this.modalDenouncementCode.show()

            this.form.reset()

            this.wizard.model.navigationMode.goToStep(0)
            this.step1 = false
            this.step2 = false
            this.step3 = false
            this.submitted = false
            this.sended = false
        })
    }

    seeDenouncement() {
        this.router.navigate([  this.company.slug + '/denouncement' ])
    }

}
