import { Observable } from 'rxjs';
import { delay, retryWhen, tap } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';

const createWebSocket = uri => {
  return Observable.create(observer => {
    try {
      console.log('Create webSocket');
      const subject = webSocket(uri);

      const handler = setInterval(() => {
        subject.next('hi there');
      }, 100);

      const subscription = subject
        .asObservable()
        .subscribe(data => observer.next(data), error => observer.error(error), () => observer.complete());

      return () => {
        clearInterval(handler);
        if (!subscription.closed) {
          subscription.unsubscribe();
        }
      };
    } catch (error) {
      observer.error(error);
    }
  });
};

createWebSocket('ws://localhost:7777')
  .pipe(
    retryWhen(errors =>
      errors.pipe(
        tap(err => {
          console.error('Handle error in retryWhen');
        }),
        delay(1000)
      )
    )
  )
  .subscribe(data => console.log(data), err => console.error(err));
