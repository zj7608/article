import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.css'],
})
export class AddarticleComponent implements OnInit {
  constructor(private http: HttpClient) {}
  login: FormGroup = new FormGroup({
    article_title: new FormControl(''),
    article_content: new FormControl(''),
  });

  click() {
    const httpOptions: any = {
      hearder: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    const storage = window.localStorage;
    let user_name = { user_name: storage['user_name'] };
    //通过storage获取用户名判断是否已登录
    if (user_name['user_name'] == undefined) {
      alert('로그인 후 글작성이 가능합니다');
      parent.location.href = 'http://127.0.0.1:4200/ulogin';
    } else {
      let date = {};
      let article = this.login.value;

      Object.assign(date, article, user_name);
      let artContentApi = 'http://127.0.0.1:3000/frontend/addArticle';

      this.http.post(artContentApi, date, httpOptions).subscribe((res) => {
        let num = res['num'];
        if (num == '1') {
          alert('작성 완료');
          parent.location.href = 'http://127.0.0.1:4200';
        } else {
          alert('게시 실패');
          parent.location.href = 'http://127.0.0.1:4200/addarticle';
        }
      });
    }
  }
  ngOnInit(): void {}
}
