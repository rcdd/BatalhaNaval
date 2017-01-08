import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html'
})
export class AppComponent {

     constructor(private authService: AuthService) { }

    isLogged(): boolean {
        if (this.authService.user !== '' ) {
            return true;
        }
        return false;
    }
}
