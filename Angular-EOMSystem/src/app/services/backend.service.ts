import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class BackendService implements OnInit {
  private token: string | null | undefined;
  constructor(private http: HttpClient, private authtoken: TokenService) {}

  ngOnInit(): void {
    this.token = this.authtoken.get();
    console.log(this.token);
  }
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };
  signup(data: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/signup', data);
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(
      'http://127.0.0.1:8000/api/login',
      data,
      this.httpOptions
    );
  }
  me(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.post<any>('http://127.0.0.1:8000/api/me', null, {
      headers,
    });
  }
  editUserprofile(data: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.post<any>(
      'http://127.0.0.1:8000/api/me/update-profile',
      data,
      {
        headers,
      }
    );
  }
  userPhoto(filename: string): Observable<Blob> {
    return this.http.get(`http://127.0.0.1:8000/api/user/photo/${filename}`, {
      responseType: 'blob',
    });
  }
  userById(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/user/${id}`, {
      headers,
    });
  }
  userRole(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get('http://127.0.0.1:8000/api/userRole', { headers });
  }
  programs() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get('http://127.0.0.1:8000/api/programs', { headers });
  }

  createProgram(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    return this.http.post<any>(
      'http://127.0.0.1:8000/api/programs',
      JSON.stringify(data),
      {
        headers,
      }
    );
  }
  searchProgram(data: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/programs/search/${data}`, {
      headers,
    });
  }
  filterByLeader(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/programs/leader/${id}`, {
      headers,
    });
  }
  programsById(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/programs/${id}`, {
      headers,
    });
  }

  editProgram(data: any, id: number) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    return this.http.put(
      `http://127.0.0.1:8000/api/programs/edit/${id}`,
      JSON.stringify(data),
      {
        headers,
      }
    );
  }
  deleteProgram(id: number) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    return this.http.post(
      `http://127.0.0.1:8000/api/programs/delete/${id}`,
      null,
      {
        headers,
      }
    );
  }

  programLeader(pid: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/programLeader/${pid}`, {
      headers,
    });
  }
  programMember(pid: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/members/${pid}`, {
      headers,
    });
  }

  programPartners(pid: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/program-partner/${pid}`, {
      headers,
    });
  }

  allProgramPartners() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/program-partners`, {
      headers,
    });
  }

  getPArticipantById(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/getparticipant/${id}`, {
      headers,
    });
  }

  programParticipants(pid: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/participant/${pid}`, {
      headers,
    });
  }

  programFiles(pid: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/file/${pid}`, {
      headers,
    });
  }

  //partners
  partnerById(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/partner/${id}`, {
      headers,
    });
  }
  addPartner(data: any, pid: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.post<any>(
      `http://127.0.0.1:8000/api/partners/${pid}`,
      data,
      { headers }
    );
  }
  updatePartner(data: any, pid: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.post<any>(
      `http://127.0.0.1:8000/api/partner/update/${pid}`,
      data,
      { headers }
    );
  }
  deletePartner(id: number) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    return this.http.post(
      `http://127.0.0.1:8000/api/partner/delete/${id}`,
      null,
      {
        headers,
      }
    );
  }
  getMoa(filename: string) {
    return this.http.get(`http://localhost:8000/api/partner/moa/${filename}`, {
      responseType: 'blob',
    });
  }

  //users

  userByStatus(data: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(
      `http://127.0.0.1:8000/api/users/filter/status/${data}`,
      {
        headers,
      }
    );
  }
  allUsers() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/users`, {
      headers,
    });
  }
  editUser(data: any, id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>(
      `http://127.0.0.1:8000/api/user/edit/${id}`,
      data,
      { headers }
    );
  }
  editUserPhoto(data: any, id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>(
      `http://127.0.0.1:8000/api/user/edit-photo/${id}`,
      data,
      { headers }
    );
  }
  deleteUser(id: number) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    return this.http.post<any>(
      `http://127.0.0.1:8000/api/user/delete/${id}`,
      null,
      {
        headers,
      }
    );
  }
  updateUserPassowrd(data: any, id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    return this.http.post<any>(
      `http://127.0.0.1:8000/api/user/update-password/${id}`,
      data,
      { headers }
    );
  }

  //progmembers
  addMember(pid: number, data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    return this.http.post<any>(
      `http://127.0.0.1:8000/api/members/${pid}`,
      JSON.stringify(data),
      {
        headers,
      }
    );
  }
  deleteMember(pid: number, uid: number) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    return this.http.post(
      `http://127.0.0.1:8000/api/members/delete/${pid}/${uid}`,
      null,
      {
        headers,
      }
    );
  }

  //participants
  addParticipant(data: any, pid: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    return this.http.post<any>(
      `http://127.0.0.1:8000/api/participant/${pid}`,
      JSON.stringify(data),
      {
        headers,
      }
    );
  }
  editParticipant(data: any, pid: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.post<any>(
      `http://127.0.0.1:8000/api/participant/edit/${pid}`,
      data,
      { headers }
    );
  }
  deleteParticipant(id: number) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    return this.http.post(
      `http://127.0.0.1:8000/api/participant/delete/${id}`,
      null,
      {
        headers,
      }
    );
  }

  //Flow
  programFlow(pid: number) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    return this.http.get(`http://127.0.0.1:8000/api/program-flow/${pid}`, {
      headers,
    });
  }
  addFlow(data: any, pid: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    return this.http.post<any>(
      `http://127.0.0.1:8000/api/flow/${pid}`,
      JSON.stringify(data),
      {
        headers,
      }
    );
  }
  deleteFlow(id: number) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    return this.http.post(`http://127.0.0.1:8000/api/flow/delete/${id}`, null, {
      headers,
    });
  }

  //Files
  addFile(data: any, pid: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.post<any>(`http://127.0.0.1:8000/api/files/${pid}`, data, {
      headers,
    });
  }
  editFile(data: any, id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.post<any>(
      `http://127.0.0.1:8000/api/file/edit/${id}`,
      data,
      {
        headers,
      }
    );
  }
  deleteFile(id: number) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    return this.http.post(`http://127.0.0.1:8000/api/file/delete/${id}`, null, {
      headers,
    });
  }
  getFile(filename: string) {
    return this.http.get(`http://localhost:8000/api/files/${filename}`, {
      responseType: 'blob',
    });
  }

  //announcements
  expiringMoa() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/partner/moa/expiring`, {
      headers,
    });
  }
  renewPartner(data: any, id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.post(
      `http://127.0.0.1:8000/api/partner/moa/renew/${id}`,
      data,
      {
        headers,
      }
    );
  }

  //faculty related
  programByLeader() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/leaderof`, {
      headers,
    });
  }
  programBymember() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/memberof`, {
      headers,
    });
  }

  //dashboard
  facultyCount() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/faculty/count`, {
      headers,
    });
  }
  pendingUsersCount() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/pendingusers/count`, {
      headers,
    });
  }
  activeProgramsCount() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/activeprograms/count`, {
      headers,
    });
  }
  pastProgramsCount() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/pastprograms/count`, {
      headers,
    });
  }
  partnersCount() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(`http://127.0.0.1:8000/api/partners/count`, {
      headers,
    });
  }
  //reports
  programPartnersWithActiveMoa() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get('http://127.0.0.1:8000/api/partners/active-moa', {
      headers,
    });
  }

  programPartnersWithExpiredMoa() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get('http://127.0.0.1:8000/api/partners/expired-moa', {
      headers,
    });
  }

  activeMoaFilterByDay() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(
      'http://127.0.0.1:8000/api/partners/activeMoaFilterByDay',
      {
        headers,
      }
    );
  }

  activeMoaFilterByWeek() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(
      'http://127.0.0.1:8000/api/partners/activeMoaFilterByWeek',
      {
        headers,
      }
    );
  }

  activeMoaFilterByMonth() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(
      'http://127.0.0.1:8000/api/partners/activeMoaFilterByMonth',
      {
        headers,
      }
    );
  }

  activeMoaFilterByYear() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(
      'http://127.0.0.1:8000/api/partners/activeMoaFilterByYear',
      {
        headers,
      }
    );
  }

  expiredMoaFilterByDay() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(
      'http://127.0.0.1:8000/api/partners/expiredMoaFilterByDay',
      {
        headers,
      }
    );
  }

  expiredMoaFilterByWeek() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(
      'http://127.0.0.1:8000/api/partners/expiredMoaFilterByWeek',
      {
        headers,
      }
    );
  }

  expiredMoaFilterByMonth() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(
      'http://127.0.0.1:8000/api/partners/expiredMoaFilterByMonth',
      {
        headers,
      }
    );
  }

  expiredMoaFilterByYear() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(
      'http://127.0.0.1:8000/api/partners/expiredMoaFilterByYear',
      {
        headers,
      }
    );
  }
}
