import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ArticlesComponent } from './articles/articles.component';
import { ProjectsComponent } from './projects/projects.component';

export const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent 
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'articles',
        component: ArticlesComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    }
];
