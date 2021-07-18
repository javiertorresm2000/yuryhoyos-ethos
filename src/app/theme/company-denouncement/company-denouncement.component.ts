import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidatorFn, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { User } from 'src/app/user';

@Component({
    selector: 'app-company-denouncement',
    templateUrl: './company-denouncement.component.html',
    styleUrls: ['../../../assets/icon/icofont/css/icofont.scss'],
})
export class CompanyDenouncementComponent implements OnInit {

    @ViewChild('modalLarge') modalLarge;
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

    constructor(public formBuilder: FormBuilder, public router: Router, private api: ApiService) {
        this.showCreateButton = ! User.isInvestigator()

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


        api.getOffices(offices => {
            this.officeRows = offices.filter(e => !!e.enabled)
        })

        api.getAreas(areas => {
            this.areaRows = areas.filter(e => !!e.enabled)
        })

        api.getCategories(categories => {
            this.categoryRows = categories.filter(e => !!e.enabled)
        })

        api.getSources(sources => {
            this.sourceRows = sources
        })


        this.form = this.formBuilder.group({

            category_id: [null, Validators.required],
            source_id: [null, Validators.required],
            area_id: [null, Validators.required],
            office_id: [null, Validators.required],
            relationship: [null, Validators.required],


            people: [null, Validators.required],
            description: [null, Validators.required],


            first_name: null,
            job: null,
            phone: null,
            last_name: null,
            email: [null, [Validators.required, Validators.email]],

        });

        api.getDenouncements(denouncements => {
            let mapped = denouncements.map(d => {
                d.label_type = (d.first_name) ? 'primary' : 'info-border'
                d.type = (d.first_name) ? 'Publica' : 'Anónima'

                return d
            })
            this.refreshRows(mapped)
        })
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

    ngOnInit() {
        console.log('ON INIT0  COMPANY DENOUNCE ')
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
            !this.form.controls.source_id.errors &&
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
        this.api.postDenouncements({
            evidences: this.uploadedImages,
            denouncement: this.form.value
        }, () => {
            window.location.reload();
        })
    }

}
