import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'state'
})
export class StatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        let state = value
        let type = value
        
        if (value == 'created') {
            state = 'Por asignar'
            type = 'success'
        }
        if (value == 'assigned') {
            state = 'En investigación'
            type = 'primary'
        }
        if (value == 'desestimate') {
            state = 'Desestimado'
            type = 'inverse'
        }
        if (value == 'closed') {
            state = 'Cerrado'
            type = 'inverse'
        }
        if (value == 'wait_answer') {
            state = 'Esperando respuesta'
            type = 'warning'
        }
        if (value == 'replied') {
            state = 'Nueva respuesta'
            type = 'info'
        }

        return args ? type : state
    }
}