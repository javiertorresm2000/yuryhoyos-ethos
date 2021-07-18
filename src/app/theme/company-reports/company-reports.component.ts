import { Component, OnInit } from '@angular/core';
import { IOption } from 'ng-select';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/excel-service.service';

@Component({
    selector: 'app-company-reports',
    templateUrl: './company-reports.component.html',
    styleUrls: ['../../../assets/icon/icofont/css/icofont.scss']
})
export class CompanyReportsComponent implements OnInit {

    public categories : Array<IOption> = []
    public sources : Array<IOption> = []
    
    public priorityLevels : Array<IOption> = [
        { value: 'high', label: 'Alta' },
        { value: 'medium', label: 'Media' },
        { value: 'low', label: 'Baja' },
    ]

    public states : Array<IOption> = [
        { value: 'created', label: 'Sin Asignar' },
        { value: 'assigned', label: 'En Investigación' },
        { value: 'wait_answer', label: 'Esperando respuesta del denunciante' },
        { value: 'replied', label: 'Nueva respuesta del denunciante' },
        { value: 'desestimate', label: 'Desestimada' },
        { value: 'closed', label: 'Cerrada' },
    ]

    public rowsFilter = []

    public form: FormGroup;

    constructor(private api : ApiService, private formBuilder: FormBuilder, private router: Router, private excelService: ExcelService) {
        api.getCategories(categories => {
            this.categories = categories.filter(e => !!e.enabled).map(c => ({ value: c.id, label:c.name }))
        })

        api.getSources(sources => {
            this.sources = sources.map(c => ({ value: c.id, label:c.name }))
        })

        this.form = this.formBuilder.group({
            priority: null,
            state: null,
            start: null,
            end: null,
            category_id: null,
            source_id: null
        })
    }

    ngOnInit() { }

    search() {
        this.api.postReports(this.form.value, denouncements => {
            let mapped = denouncements.map(d => {
                d.label_type = (d.first_name) ? 'primary' : 'info-border'
                d.type = (d.informer_first_name) ? 'Publico' : 'Anónimo'

                if (d.priority == "high") {
                    d.label_priority = "danger"
                    d.priority = "Alta"
                }

                if (d.priority == "medium") {
                    d.label_priority = "primary"
                    d.priority = "Media"
                }


                if (d.priority == "low") {
                    d.label_priority = "info-border"
                    d.priority = "Baja"
                }



                let deference = new Date().getTime() - new Date(d.created_at).getTime();
                d.days = Math.round(Math.abs(deference / (1000 * 60 * 60 * 24)))

                return d
            })

            this.rowsFilter = mapped
        })
    }

    download() {
        const data = this.rowsFilter.map(d => {

            return {
                "Codigo": d.id,
                "Estado": this.states.find(s => s.value == d.state).label,
                "Criticidad": d.priority,
                "Fecha": d.created_at,
                "Denunciado": d.people,
                "Denunciante": d.informer_first_name ? `${d.informer_first_name} ${d.informer_last_name}` : 'Anonimo',
                "Correo Denunciante": d.informer_first_name ? d.informer_email : 'Anonimo',
                "Categoria": d.category,
                "Area": d.area,
                "Sucursal": d.office,
                "Investigador": d.investigator_first_name ? `${d.investigator_first_name} ${d.investigator_last_name}` : '',
                "Días Transcurridos": d.days,
                "Motivo" : d.reason ? d.reason : ''
            }
        })

        this.excelService.exportAsExcelFile(data, 'reporte_denuncias');
    }

    clear(){
        this.form.reset()
    }

    see(row) {
        console.log(row)

        this.router.navigate(['/denouncement/' + row.id])
    }

}
