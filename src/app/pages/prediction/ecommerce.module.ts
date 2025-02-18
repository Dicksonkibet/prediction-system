import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';

import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';







  // Import ReactiveFormsModule
import { RouterModule } from '@angular/router';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


//import { StudentComponent } from './school student/students.component';
//import { StudentGuardianComponent } from './student-guardian/student-guardian.component';
//import { ViewStudentsComponent1 } from './school student/view-students/view-students.component';
//import { ActivityReportsComponent } from './Reports/activity-reports/activity-reports.component';

//import { GllistComponent } from './glAccounts/gllist/gllist.component';
//import { StudentComponent } from './school student/students.component';
//import { FormsModule } from '@angular/forms';
//import { StudentComponent } from './school student/students.component';
//import { ViewStudentsComponent } from './school student/view-students/view-students.component';
//import { StudentGuardianComponent } from './student-guardian/student-guardian.component';


const config: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 100,
};

@NgModule({
 
  declarations: [ ],
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule, 
    FormsModule,    
    EcommerceRoutingModule,
    NgbNavModule,
    NgbModalModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgbDropdownModule,
    DropzoneModule,
    ReactiveFormsModule,
    UIModule,
    WidgetModule,
    Ng5SliderModule,
    NgSelectModule,
    NgbPaginationModule
  ],
  
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: config
    }
  ]
})


export class EcommerceModule { }
