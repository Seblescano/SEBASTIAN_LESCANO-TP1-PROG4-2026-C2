import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDQ0MDlkOTU3ZmNhMWU2MWFmMjhjMTU4M2E4OWE3OCIsIm5iZiI6MTc5MTI1MzgwNi42NDEsInN1YiI6IjZhYzQ1ZDJlNmU3NWE2YjBkZTk1YzdlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l8K2kPWa9ZmARzucXScu_4xADICWJZQQiPbZjk-_ilg'; 

  if (req.url.includes('api.themoviedb.org')) {
    const peticionClonada = req.clone({
      setHeaders: {
        Authorization: `Bearer ${apiKey}`
      }
    });
    return next(peticionClonada);
  }

  return next(req);
};