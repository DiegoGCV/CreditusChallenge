// Angular
import { Component, OnInit } from '@angular/core';

//Interfaces
import { Post } from './interfaces/post.interface';

// Services
import { SnackBarService } from './services/snackbar.service';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'creditus-challenge';
  constructor(private apiService: ApiService, private snackBService:SnackBarService) {}
  postList: Post[] = [];
  postTitle: string = "";
  postContent: string = "";

  ngOnInit(): void {

    this.apiService.getPosts().subscribe({
      next: (data:any) => {
        this.postList = data.data
        console.log(this.postList)
      },
      error: (error: any) => {
        this.snackBService.openSnackBar('There was an error loading posts','Close')
        console.error('Error: ', error);
      }
    })

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
        data.data.isNew = '1'
        this.postList.unshift(data.data)
      },
      error: (error: any) => {
        this.snackBService.openSnackBar('There was an error creating the post','Close')
        console.error('There was an error!', error);
      }
    })
  }
}
