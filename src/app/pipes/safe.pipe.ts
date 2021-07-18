import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {

    constructor(protected sanitizer: DomSanitizer) { }

    transform(value: any, args?: any): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(value)
    }
}
