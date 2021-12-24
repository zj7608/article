import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
HttpClient;
@Component({
  selector: 'app-artcomment',
  templateUrl: './artcomment.component.html',
  styleUrls: ['./artcomment.component.css'],
})
export class ArtcommentComponent implements OnInit {
  article_id: string;
  article_title: string;
  article_content: string;
  artComment: ArrayBuffer;

  constructor(private routeInfo: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const httpOptions: any = {
      hearder: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    this.article_id = this.routeInfo.snapshot.queryParams['id'];

    let date: object = { article_id: this.article_id };

    let artContentApi = 'http://127.0.0.1:3000/frontend/articleContent';

    this.http.post(artContentApi, date, httpOptions).subscribe((res) => {
      this.article_title = res['article_title'];
      this.article_content = res['article_content'];
    });

    let artCommentApi = 'http://127.0.0.1:3000/frontend/showComment';
    this.http.post(artCommentApi, date, httpOptions).subscribe((res) => {
      this.artComment = res;
    });
  }

  login: FormGroup = new FormGroup({
    comment: new FormControl(''),
  });
  click() {
    const httpOptions: any = {
      hearder: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let date = {};
    let comment = this.login.value;
    let article_id = { article_id: this.article_id };
    const storage = window.localStorage;
    let user_name = { user_name: storage['user_name'] };
    //通过storage获取用户名判断是否已登录

    if (user_name['user_name'] == undefined) {
      alert('로그인');
      parent.location.href = 'http://127.0.0.1:4200/ulogin';
    } else {
      Object.assign(date, article_id, comment, user_name);
      console.log(date);

      let artContentApi = 'http://127.0.0.1:3000/frontend/addComment';
      this.http.post(artContentApi, date, httpOptions).subscribe((res) => {
        let num = res['num'];
        console.log(num);

        if (num == '1') {
          alert('댓글 성공');
          parent.location.href =
            'http://127.0.0.1:4200/artcomment?id=' + this.article_id;
        } else {
          alert('댓글 실패');
          parent.location.href =
            'http://127.0.0.1:4200/artcomment?id=' + this.article_id;
        }
      });
    }
  }
}
