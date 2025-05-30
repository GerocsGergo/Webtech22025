import { Component, OnInit, inject } from '@angular/core';
import { VersionService } from '../../services/version.service';
import { VersionDTO } from '../../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  imports: [],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent implements OnInit{

  versionService = inject(VersionService)
  router = inject(Router);
    versionInfo: VersionDTO = {
      version: ''
    };

    
  ngOnInit() {
    this.versionService.getVersion().subscribe({
      next: (versionInfo) =>this.versionInfo = versionInfo,
      error: (err) => {
        console.error('Failed to load version:', err);
      }
    });
  }




  }
