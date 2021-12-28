import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
})
export class AdduserComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private http: HttpClient) {}
  login: FormGroup = new FormGroup({
    user_name: new FormControl(''),
    user_pwd: new FormControl(''),
    user_tel: new FormControl(''),
    user_mail: new FormControl(''),
  });

  click() {
    const httpOptions: any = {
      hearder: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let user = this.login.value;
    let user_name = user['user_name'];
    let u_detect = /^[a-zA-Z0-9_]{7,15}$/;
    let u_mail_detect = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

    if (u_detect.test(user_name) && u_detect.test(user['pwd'])) {
      if (u_mail_detect.test(user['user_mail'])) {
        let artContentApi = 'http://127.0.0.1:3000/backend/user/add';
        console.log(user);

        this.http.post(artContentApi, user, httpOptions).subscribe((res) => {
          let num = res['num'];
          if (num == '1') {
            let storage = window.localStorage;
            storage.user_name = user_name;
            alert('가입 성공');
            parent.location.href = 'http://127.0.0.1:4200';
          } else {
            alert('이미 존재하는 아이디입니다');
            parent.location.href = 'http://127.0.0.1:4200/adduser';
          }
        });
      } else {
        alert('请输入正确的邮箱');
      }
    } else {
      alert('账号或密码必须大于7位小于15位');
    }
  }
}
