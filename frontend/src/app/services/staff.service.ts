import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaffResponseDTO } from '../../../models';

@Injectable({ 
    providedIn: 'root' 
})


export class StaffService {
  http = inject(HttpClient);


}