import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor(public http: HttpClient) {}

  article_title: any;

  ngOnInit(): void {
    const url = 'http://127.0.0.1:3000/frontend/articleTitle';
    this.http.get(url).subscribe((res) => {
      this.article_title = res;
    });
  }

  logout() {
    const storage = window.localStorage;
    let user_name = { user_name: storage['user_name'] };

    if (user_name['user_name'] != undefined) {
      localStorage.removeItem('user_name');
      alert('로그아웃');
      parent.location.href = 'http://127.0.0.1:4200';
    } else {
      alert('로그인');
      parent.location.href = 'http://127.0.0.1:4200/ulogin';
    }
  }
}
