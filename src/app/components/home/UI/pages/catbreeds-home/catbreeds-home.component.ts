import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../../services/apis-service';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonRow, IonSkeletonText, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CatBreed, Image } from '../../../interfaces/list-home.interface';
import { chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-catbreeds-home',
  templateUrl: './catbreeds-home.component.html',
  styleUrls: ['./catbreeds-home.component.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonRow,
    IonCol,
    IonGrid,
    IonCard,
    IonLabel,
    IonButton,
    IonButtons,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonSkeletonText,
    IonSpinner,
  ],
})
export class CatbreedsHomeComponent implements OnInit {

  catId: string;
  image: Image | null = null
  catbreedHome: CatBreed | null = null
  isLoading: boolean = false
  isLoadingImg: boolean = false
  skeletonItems = new Array(1)

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _servicesService: ServicesService,
  ) { 
    addIcons({ chevronBackOutline });
    this.catId = this._activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.catbreedImage()
    this.catbreed()
  }

  async catbreedImage(): Promise<void> {
    this.isLoadingImg = true
    try {
      this.image = await lastValueFrom(this._servicesService.getCatImageById(this.catId))
      this.isLoadingImg = false
    } catch (error) {
      this.isLoadingImg = false
    } 
  }

  async catbreed(): Promise<void> {
    this.isLoading = true
    try {
      this.catbreedHome = await lastValueFrom(this._servicesService.getCatbreedById(this.catId))
      this.isLoading = false
    } catch (error) {
      this.isLoading = false
    }
  }

  goBack() {
    this._router.navigate(['home'])
  }

}
