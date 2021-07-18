import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {AppComponent} from './app.component';

import {retry, catchError} from 'rxjs/operators';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private appComponent: AppComponent) {
  }

  login(email, password, cb) {
    const token = this._utf8_to_b64(email + ':' + password);

    const headers = new Headers({
      'Authorization': 'Basic ' + token
    });

    fetch(this._host() + 'login', {method: 'GET', headers: headers})
      .then(r => r.json())
      .then(data => {

        if (data.error) {
          this.appComponent.notify({
            title: 'Acceso denegado',
            msg: data.error,
            type: 'warning'
          });
          return;
        }
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(data));

        cb(data);
      })
      .catch(y => {
        this.appComponent.notify({
          title: 'Acceso denegado',
          msg: 'Credenciales incorrectas',
          type: 'warning'
        });
      });
  }

  getCompany(name, cb) {
    this.http.get(this._host() + 'companies/' + name, {}).pipe(
      retry(2),
      catchError(() => {
        console.log('pues nada, hubo un fucking error');
        return '';
      })
    ).subscribe(data => {
      cb(data);
    });

  }

  getSliders(cb) {
    this.http.get(this._host() + 'sliders').pipe(
      retry(2),
      catchError(() => {
        console.log('pues nada, hubo un fucking error');
        return '';
      })
    ).subscribe(data => {
      cb(data);
    });
  }


  getExternealConversation(id, cb) {
    this.http.get(this._host() + 'external-conversations/' + id, {}).pipe(
      retry(2),
      catchError(() => {
        console.log('pues nada, hubo un fucking error');
        return '';
      })
    ).subscribe(data => {
      cb(data);
    });
  }

  postRestorePassword = (body, cb) => this._postWithoutToken('restore-password', body, cb);
  getProfile = (cb) => this._getWithToken('profile', cb);
  getCountries = (cb) => this._getWithToken('countries', cb);
  getBussinesses = (cb) => this._getWithToken('bussinesses', cb);
  getSectors = (cb) => this._getWithToken('sectors', cb);

  getExternalCategories = (id, cb) => this._getWithoutToken('external-categories/' + id, cb);
  getExternalAreas = (id, cb) => this._getWithoutToken('external-areas/' + id, cb);
  getExternalOffices = (id, cb) => this._getWithoutToken('external-offices/' + id, cb);
  getExternalSources = (id, cb) => this._getWithoutToken('external-sources/' + id, cb);
  postExternalDenouncements = (body, cb) => this._postWithoutToken('external-denouncements', body, cb);

  postExternalConversation = (body, cb) => this._postWithoutToken('external-conversations', body, cb);

  getDashboard = (cb) => this._getWithToken('dashboard', cb);

  getCompanies = (cb) => this._getWithToken('companies', cb);
  getCompanyByRuc = (slug, cb) => this._getWithToken('companies/ruc/'+slug, cb);
  getuserByEmail = (email, cb) => this._getWithToken('users/email/'+email, cb);

  putCompany = (id, body, cb) => this._putWithToken('companies/' + id, body, cb);
  putProfile = (id, body, cb) => this._putWithToken('profile/' + id, body, cb);

  postCompanyAndUsers = (body, cb) => this._postWithToken('companies', body, cb);

  postReports = (body, cb) => this._postWithToken('reports', body, cb);


  getFreeUsers = (cb) => this._getWithToken('free-users', cb);

  getCompanyUsers = (cb) => this._getWithToken('company-users', cb);

  postCompanyUser = (body, cb) => this._postWithToken('company-users', body, cb);

  putCompanyUser = (id, body, cb) => this._putWithToken('company-users/' + id, body, cb);

  getCategories = (cb) => this._getWithToken('categories', cb);
  getAreas = (cb) => this._getWithToken('areas', cb);
  getOffices = (cb) => this._getWithToken('offices', cb);
  getSources = (cb) => this._getWithToken('sources', cb);


  postCategories = (body, cb) => this._postWithToken('categories', body, cb);

  postAreas = (body, cb) => this._postWithToken('areas', body, cb);

  getSettings = (cb) => this._getWithToken('settings', cb);
  postSettings = (body, cb) => this._postWithToken('settings', body, cb);

  postOffices = (body, cb) => this._postWithToken('offices', body, cb);
  postSources = (body, cb) => this._postWithToken('sources', body, cb);

  postReasons = (body, cb) => this._postWithToken('close-reasons', body, cb);

  putCategories = (id, body, cb) => this._putWithToken('categories/' + id, body, cb);

  putAreas = (id, body, cb) => this._putWithToken('areas/' + id, body, cb);
  putSources = (id, body, cb) => this._putWithToken('sources/' + id, body, cb);
  putReasons = (id, body, cb) => this._putWithToken('close-reasons/' + id, body, cb);

  putOffices = (id, body, cb) => this._putWithToken('offices/' + id, body, cb);

  getUsers = (cb) => this._getWithToken('users', cb);

  postUser = (body, cb) => this._postWithToken('users', body, cb);

  putUser = (id, body, cb) => this._putWithToken('users/' + id, body, cb);

  getDenouncements = (cb) => this._getWithToken('denouncements', cb);

  getInvestigators = (cb) => this._getWithToken('investigators', cb);

  putDenouncement = (id, body, cb) => this._putWithToken('denouncements/' + id, body, cb);

  getDenouncement = (id, cb) => this._getWithToken('denouncements/' + id, cb);

  getDenouncementByIdAndCompany(companyId, denouncementId, cb, cbErr) {
    this._getWithToken(`external-denouncements/${companyId}/${denouncementId}`, cb, cbErr);
  }

  getConversation = (id, cb) => this._getWithToken('conversations/' + id, cb);

  getCloseReasons = (cb) => this._getWithToken('close-reasons', cb);

  postConversation = (body, cb) => this._postWithToken('conversations', body, cb);

  postDenouncements = (body, cb) => this._postWithToken('denouncements', body, cb);


  getNotifications = (cb) => this._getWithToken('notifications', cb);

  ////////////////////////////////////////////////////

  private _getWithoutToken(endpoint, cb) {
    this.http.get(this._host() + endpoint, {}).pipe(
        retry(2),
        catchError((err) => {
            this._generalErrorCatch(err);
          return '';
        })
      ).subscribe(data => {
        cb(data);
      });
  }

  private _postWithoutToken(endpoint, body, cb) {
    this.http.post(this._host() + endpoint, body, {headers: this._sipleHeaderPost()}).pipe(
      catchError((err) => {
        this._generalErrorCatch(err);
        return '';
      })
    ).subscribe(data => {
      cb(data);
      this._generalSuccess(data);
    });
  }

  private _getWithToken(endpoint, cb, cbErr = () => {
  }) {
    this.http.get(this._host() + endpoint, {headers: this._headerWithToken()}).pipe(
      retry(2),
      catchError((err) => {
        this._generalErrorCatch(err);
        cbErr();
        return '';
      })
    ).subscribe(data => {
      cb(data);
    });
  }

  private _postWithToken(endpoint, body, cb, cbErr = () => {}) {
    this.http.post(this._host() + endpoint, body, {headers: this._headerWithTokenForPost()}).pipe(
      retry(2),
      catchError((err) => {
        this._generalErrorCatch(err);
        cbErr();
        return '';
      })
    ).subscribe(data => {
      cb(data);
      this._generalSuccess(data);
    });
  }

  private _putWithToken(endpoint, body, cb) {
    this.http.put(this._host() + endpoint, body, {headers: this._headerWithTokenForPost()}).pipe(
      catchError((err) => {
        this._generalErrorCatch(err);
        return '';
      })
    ).subscribe(data => {
      cb(data);
      this._generalSuccess(data);
    });
  }

  private _generalSuccess(data) {
    this.appComponent.notify({
      title: 'Correcto',
      msg: data && data.error ? data.error : 'Operación exitosa',
      type: 'success'
    });
  }

  private _generalErrorCatch(err) {
    if (err.status === 400) {
        this.appComponent.notify({
            title: 'Información invalida',
            msg: err.error.error,
            type: 'warning'
          });
    }
    
    if (err.status === 401) {
      this.appComponent.notify({
        title: 'Acceso denegado',
        msg: 'Usted no tiene esta acción permitida',
        type: 'warning'
      });
    }

    if (err.status === 500) {
      this.appComponent.notify({
        title: 'Error al ejecutar operación',
        msg: 'Contacte a su administrador',
        type: 'error'
      });
    }
  }


  //////////////////////////////////////////////////////


  public _host() {
    if (!environment.production) {
      console.log('LOCAL REQUEST');
    }

    return environment.host;
  }

  public _utf8_to_b64 = (str): string => window.btoa(unescape(encodeURIComponent(str)));

  private _headerWithToken(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Authorization': 'Basic ' + token
    });
  }

  private _headerWithTokenForPost(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Authorization': 'Basic ' + token,
      'Content-Type': 'application/json'
    });
  }

  private _sipleHeaderPost(): HttpHeaders {
    return new HttpHeaders({
        'Content-Type': 'application/json'
      });
  }
}
