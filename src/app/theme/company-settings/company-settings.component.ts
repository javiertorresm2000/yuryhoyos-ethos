import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
    selector: 'app-company-settings',
    templateUrl: './company-settings.component.html',
    styleUrls: ['../../../assets/icon/icofont/css/icofont.scss'],
    host: {
        '(window:resize)': 'onResize($event)'
    }
})
export class CompanySettingsComponent implements OnInit {
    @ViewChild('modalLarge') modalLarge;
    @ViewChild('categories_table') categories_table;
    @ViewChild('offices_table') offices_table;
    @ViewChild('areas_table') areas_table;
    @ViewChild('reasons_table') reasons_table;
    @ViewChild('sources_table') sources_table;


    public CATEGORY_TYPE = "Categoría"
    public OFFICE_TYPE = "Sucursal"
    public AREA_TYPE = "Área"
    public REASON_TYPE = "Motivo"
    public SOURCE_TYPE = "Tipo de Ingreso"

    public categoryRows: Array<any>;
    public officeRows: Array<any>;
    public areaRows: Array<any>;
    public reasonRows: Array<any>;
    public sourceRows: Array<any>;


    public rowsFilter: Array<any>;
    private tempFilter: Array<any>;
    public form: FormGroup;
    public submitted: boolean;
    private isEditing: boolean;


    public currentType: string;



    constructor(public formBuilder: FormBuilder, private api: ApiService) {

        this.form = this.formBuilder.group({
            name: [null, Validators.required],
            id: null,
            enabled: null,
            editable: null,
        });


        api.getOffices(offices => {
            this.officeRows = offices
        })

        api.getAreas(areas => {
            this.areaRows = areas
        })

        api.getCategories(categories => {
            this.categoryRows = categories
        })

        api.getCloseReasons(reasons => {
            this.reasonRows = reasons
        })

        api.getSources(sources => {
            this.sourceRows = sources
        })
    }

    ngOnInit() { }

    onResize(event) {
        console.log("resized")
        this.categories_table.recalculate()
        this.offices_table.recalculate()
        this.areas_table.recalculate()
        this.reasons_table.recalculate()
        this.sources_table.recalculate()
    }

    create(type) {
        if (this.currentType != type) {
            this.form.reset()
            this.submitted = false;
        }

        this.currentType = type
        this.modalLarge.show()
    }

    save() {
        this.submitted = true;

        if (!this.form.valid) {
            return;
        }

        let entity = this.form.value
        console.log(this.form.value)
        console.log(this.currentType)


        if (!this.form.value.id) {
            if (this.currentType == this.CATEGORY_TYPE) {
                this.api.postCategories(entity, entity => {
                    this.entityMapper(entityRows => entityRows.concat(entity))
                })
            }

            if (this.currentType == this.OFFICE_TYPE) {
                this.api.postOffices(entity, entity => {
                    this.entityMapper(entityRows => entityRows.concat(entity))
                })
            }

            if (this.currentType == this.AREA_TYPE) {
                this.api.postAreas(entity, entity => {
                    this.entityMapper(entityRows => entityRows.concat(entity))
                })
            }

            if (this.currentType == this.REASON_TYPE) {
                this.api.postReasons(entity, entity => {
                    this.entityMapper(entityRows => entityRows.concat(entity))
                })
            }

            if (this.currentType == this.SOURCE_TYPE) {
                this.api.postSources(entity, entity => {
                    this.entityMapper(entityRows => entityRows.concat(entity))
                })
            }

            //this.table.offset = 0;

            console.log("CREATED")
        } else {

            if (this.currentType == this.CATEGORY_TYPE) {
                this.api.putCategories(entity.id, entity, () => {
                    this.entityMapper(entityRows => entityRows.map(u => u.id == entity.id ? entity : u))
                })
            }

            if (this.currentType == this.OFFICE_TYPE) {
                this.api.putOffices(entity.id, entity, () => {
                    this.entityMapper(entityRows => entityRows.map(u => u.id == entity.id ? entity : u))
                })
            }

            if (this.currentType == this.AREA_TYPE) {
                this.api.putAreas(entity.id, entity, () => {
                    this.entityMapper(entityRows => entityRows.map(u => u.id == entity.id ? entity : u))
                })
            }

            if (this.currentType == this.REASON_TYPE) {
                this.api.putReasons(entity.id, entity, () => {
                    this.entityMapper(entityRows => entityRows.map(u => u.id == entity.id ? entity : u))
                })
            }

            if (this.currentType == this.SOURCE_TYPE) {
                this.api.putSources(entity.id, entity, () => {
                    this.entityMapper(entityRows => entityRows.map(u => u.id == entity.id ? entity : u))
                })
            }

            console.log("UPDATED")
        }

        this.modalLarge.hide()
        this.submitted = false;
        this.form.reset()
    }

    edit(row, type) {
        console.log(type)
        console.log(row)

        this.currentType = type
        this.submitted = false;
        this.form.patchValue(row);
        this.modalLarge.show()
    }

    hideShow(row, type) {
        row.enabled = !row.enabled

        const body = {
            enabled: row.enabled
        }

        if (type == this.CATEGORY_TYPE) {
            this.api.putCategories(row.id, body, () => {
                this.entityMapper(entityRows => entityRows.map(u => u.id == row.id ? row : u))
            })
        }

        if (type == this.OFFICE_TYPE) {
            this.api.putOffices(row.id, body, () => {
                this.entityMapper(entityRows => entityRows.map(u => u.id == row.id ? row : u))
            })
        }

        if (type == this.AREA_TYPE) {
            this.api.putAreas(row.id, body, () => {
                this.entityMapper(entityRows => entityRows.map(u => u.id == row.id ? row : u))
            })
        }

        if (type == this.REASON_TYPE) {
            this.api.putReasons(row.id, body, () => {
                this.entityMapper(entityRows => entityRows.map(u => u.id == row.id ? row : u))
            })
        }

        if (type == this.SOURCE_TYPE) {
            this.api.putSources(row.id, body, () => {
                this.entityMapper(entityRows => entityRows.map(u => u.id == row.id ? row : u))
            })
        }
    }

    entityMapper(cb) {
        if (this.currentType == this.CATEGORY_TYPE) {
            this.categoryRows = cb(this.categoryRows)
        }

        if (this.currentType == this.OFFICE_TYPE) {
            this.officeRows = cb(this.officeRows)
        }

        if (this.currentType == this.AREA_TYPE) {
            this.areaRows = cb(this.areaRows)
        }

        if (this.currentType == this.REASON_TYPE) {
            this.reasonRows = cb(this.reasonRows)
        }

        if (this.currentType == this.SOURCE_TYPE) {
            this.sourceRows = cb(this.sourceRows)
        }
    }
}
