import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = 'dosage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async addDosage(item: any) {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return await this.storage.set(STORAGE_KEY, storedData);
  }

  async getDosage() {
    return await this.storage.get(STORAGE_KEY) || [];
  }

  async updateDosage(item: any) { 
    let newItems: any = [];
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    for(let index of storedData){
      if (index.name === item.name) {
        newItems.push(item);
      } else {
        newItems.push(index);
      }
    }

    return await this.storage.set(STORAGE_KEY, newItems);
  }
}
