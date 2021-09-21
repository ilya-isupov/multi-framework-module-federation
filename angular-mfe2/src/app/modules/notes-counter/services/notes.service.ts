import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NotesService {
  private static errorSubject$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private httpClient: HttpClient) {
  }

  public static getError(): Observable<string> {
    return NotesService.errorSubject$;
  }

  public static setError(value: string): void {
    NotesService.errorSubject$.next(value);
  }

  public getAllNotes(): Observable<number> {
    return of(1);
  }

  public loadDnsId(): Observable<string> {
    return this.httpClient.get(
      'https://public-gateway-cloudbss-kube-cpm-dev1.k8s-apps.openshift.sdntest.netcracker.com/api/v4/tenant-manager/registration/tenants?dns=cpq',
      {
        responseType: 'text'
      }
    );
  }
}
