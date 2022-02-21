import { ApiService } from './services/api.service';
import { Component, OnInit } from '@angular/core';
import { Post } from './interfaces/post.interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'creditus-challenge';
  constructor(private apiService: ApiService) {}
  postList: Post[] = [];
  postTitle: string = "";
  postContent: string = "";

  ngOnInit(): void {
    this.apiService.getPosts().subscribe(val => this.setData(val))
  }

  setData(val: any)
  {
    this.postList = val.data;
  }

  post()
  {
    let fdata = {
      title: this.postTitle,
      content: this.postContent,
      createdAt: new Date().toLocaleString()
    }
    
    this.apiService.postRequest(fdata).subscribe({
      next: (data:any) => {
          this.postList.unshift(data.data)
      },
      error: (error: any) => {
          console.error('There was an error!', error);
      }
  })
    console.log(this.postList)
  }
}
