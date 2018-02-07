// main entry point
import { bootstrap } from 'angular2/platform/browser';
import { AppComponent }       from './app.component';
// import { BrowserModule } from 'angular2/platform-browser';
// import {FormsModule} from 'angular2/forms'

bootstrap(AppComponent).catch(err => console.error(err));