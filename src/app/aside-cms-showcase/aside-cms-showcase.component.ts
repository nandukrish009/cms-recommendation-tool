import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MainContainerComponent } from '../main-container/main-container.component';
import { FormFields } from '../form-fields';
import { HttpClient } from '@angular/common/http';
import {
  style,
  animate,
  animateChild,
  transition,
  trigger,
  query as q,
  stagger,
  AnimationMetadata,
} from '@angular/animations';
const query = (
  s: string,
  a: AnimationMetadata | AnimationMetadata[],
  o = { optional: true }
) => q(s, a, o);

@Component({
  selector: 'app-aside-cms-showcase',
  templateUrl: './aside-cms-showcase.component.html',
  styleUrls: ['./aside-cms-showcase.component.css'],
  animations: [
    trigger('list', [
      transition(':enter', [query('@items', stagger(600, animateChild()))]),
    ]),
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate(
          '1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(1)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class AsideCmsShowcaseComponent implements OnInit {
  @Input()
  radioData!: string;
  @Input()
  arrayValue!: [];
  Object = Object;
  images: any = [];
  imageData: any = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/images.json').subscribe((image) => {
      this.imageData = image;
      console.log(this.imageData);
    });

    // setTimeout(() => {
    //   var items = document.getElementsByClassName('ani');
    //   for (let i = 0; i < items.length; ++i) {
    //     fadeIn(items[i], i * 1000);
    //   }
    //   function fadeIn(item: Element, delay: number | undefined) {
    //     setTimeout(() => {
    //       item.classList.add('fadein');
    //     }, delay);
    //   }
    // }, 2000);
  }
}
