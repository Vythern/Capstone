import { Routes } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleListingComponent } from './article-listing/article-listing.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { DeleteArticleComponent } from './delete-article/delete-article.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = 
[
    { path: 'add-article', component: AddArticleComponent },
    { path: 'edit-article', component: EditArticleComponent },
    { path: 'delete-article', component: DeleteArticleComponent },
    { path: 'login', component: LoginComponent},
    { path: '', component: ArticleListingComponent, pathMatch: 'full' }
];
