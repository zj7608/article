import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-ulogin',
  templateUrl: './ulogin.component.html',
  styleUrls: ['./ulogin.component.css'],
})
export class UloginComponent implements OnInit {
  article_title: any;
  article_content: any;

  constructor(private http: HttpClient) {}
  login: FormGroup = new FormGroup({
    user_name: new FormControl(''),
    user_pwd: new FormControl(''),
  });

  click() {
    const httpOptions: any = {
      hearder: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let user = this.login.value;
    let user_name = user['user_name'];

    let artContentApi = 'http://127.0.0.1:3000/backend/user';

    this.http.post(artContentApi, user, httpOptions).subscribe((res) => {
      let num = res['num'];

      if (num == '1') {
        let storage = window.localStorage;
        storage.user_name = user_name;
        alert('로그인성공');
        parent.location.href = 'http://127.0.0.1:4200';
      } else {
        alert('아이디 또는 오류');
        parent.location.href = 'http://127.0.0.1:4200/ulogin';
      }
    });
  }
  ngOnInit(): void {}
}
