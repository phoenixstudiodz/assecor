import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://swapi.dev/api/people';
const images = [
  'https://public-v2links.adobecc.com/b3c98134-11a8-44c2-5dd2-477b8550307f/component?params=component_id%3Ad3b5e2e6-62f8-43cd-aa2e-02968e9d53c1&params=version%3A0&token=1608549539_da39a3ee_c07a4876f66b49ddcc5438bc4a1a55171a4af6d1&api_key=CometServer1',
  'https://public-v2links.adobecc.com/b3c98134-11a8-44c2-5dd2-477b8550307f/component?params=component_id%3A5977fad1-9522-4796-9026-11377029bd9a&params=version%3A0&token=1608549539_da39a3ee_c07a4876f66b49ddcc5438bc4a1a55171a4af6d1&api_key=CometServer1',
  'https://public-v2links.adobecc.com/b3c98134-11a8-44c2-5dd2-477b8550307f/component?params=component_id%3A7879ac1f-dc8d-4638-bfe1-590ef5c9d264&params=version%3A0&token=1608549539_da39a3ee_c07a4876f66b49ddcc5438bc4a1a55171a4af6d1&api_key=CometServer1'
]

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/`);
  }

  get(id:string): Observable<any> {
    return this.http.get(`${baseUrl}/${id}/`);
  }
  find(query:string): Observable<any> {
    return this.http.get(`${baseUrl}?s=${query}`);
  }
  getImage(id:number): string {
    return images[id%images.length];
  }

}
