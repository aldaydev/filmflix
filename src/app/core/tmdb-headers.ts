import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

export const tmdbHeaders = new HttpHeaders({
    Authorization: `Bearer ${environment.tmdbToken}`,
    'Content-Type': 'application/json;charset=utf-8'
});