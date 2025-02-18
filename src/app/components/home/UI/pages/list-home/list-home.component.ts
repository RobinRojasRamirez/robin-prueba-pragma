import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonGrid, IonRow, IonCol, IonCard, IonRefresherContent, IonRefresher, IonSkeletonText, IonImg } from '@ionic/angular/standalone';
import { CatBreed, Search } from '../../../interfaces/list-home.interface';
import { ServicesService } from '../../../services/apis-service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list-home',
  templateUrl: './list-home.component.html',
  styleUrls: ['./list-home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonImg,
    IonContent,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonRefresherContent,
    IonRefresher,
    IonSkeletonText
  ],
  providers: [ServicesService]
})
export class ListHomeComponent  implements OnInit {

  isLoading: boolean = false
  catbreeds: CatBreed[] = []
  skeletonItems = new Array(3)
  noResultsMessage: string = ''

  constructor(
    private readonly _servicesService: ServicesService,
    private readonly _router: Router,
    private readonly _toastController: ToastController
  ) { }

  ngOnInit() {
    this.listCatbreeds()
  }

  async handleRefresh(event: CustomEvent) {
    try {
      await this.listCatbreeds()
    } catch (error) {
      await this.showErrorToast('Hubo un error al cargar los datos', 'danger');
    } finally {
      (event.target as HTMLIonRefresherElement).complete();
    }
  }

  seeMore(item: CatBreed) {
    if ( item.id ) this._router.navigate(['catbreed-home', item.id])
  }

  async search(event: CustomEvent) {
    const searchTerm: Search = (event.detail.value || '').trim()
    if ( !searchTerm ) {
      this.listCatbreeds()
      return
    }
    this.catbreeds = await lastValueFrom(this._servicesService.getCatSearch(searchTerm))
    if ( !this.catbreeds || this.catbreeds.length === 0 ) {
      this.noResultsMessage = 'No hay gatos que coincidan con tu búsqueda.'; 
      this.catbreeds = []
    }
    this.catbreeds.map(async (item: CatBreed) => {
      if ( item.reference_image_id ) {
         item.image = await lastValueFrom(this._servicesService.getCatImageById(item.id)) || ''
      }
      return item
    })
  }

  async listCatbreeds(): Promise<void> {
    this.isLoading = true;
    try {
      this.catbreeds = await lastValueFrom(this._servicesService.getListCatbreeds())
      this.catbreeds.map(async (item: CatBreed) => {
        item.image = await lastValueFrom(this._servicesService.getCatImageById(item.id)) || ''
        this.isLoading = false
        return item
      })
    } catch (error) {
      await this.showErrorToast('Hubo un error al cargar los datos', 'danger');
    }
  }

  async showErrorToast(mensage: string, color: string): Promise<void> {
    const toast = await this._toastController.create({
      message: mensage,
      duration: 3000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }

}
