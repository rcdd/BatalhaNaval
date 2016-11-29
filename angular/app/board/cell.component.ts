import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'dad-cell',
    templateUrl: 'cell.component.html'
})
export class CellComponent {

    @Input() column:number
    @Input() line:number

}
