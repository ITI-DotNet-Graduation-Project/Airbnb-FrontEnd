import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly STORAGE_KEY = 'favorites';

  private _getFavorites() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  }

  setFavorite(cardId: number, isLiked: boolean) {
    const favorites = this._getFavorites();
    favorites[cardId] = isLiked;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
  }

  getFavorite(cardId: number) {
    const favorites = this._getFavorites();
    return favorites[cardId] || false;
  }

  getAllFavorites() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  }
}
