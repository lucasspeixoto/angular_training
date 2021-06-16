
import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

export function filterResponse() {
    return pipe(
        filter((event: any) => event.type === HttpEventType.Response),
        map((res: HttpResponse<any>) => res.body)
    );
}

export function uploadProgress(
    cb: (progress: number) => void) {
    return tap((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
            cb(Math.round((event.loaded * 100) / event.total));
        }
    });
}