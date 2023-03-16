import { Component, OnInit } from '@angular/core';

// declare function grayScale(): void;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor() {
    // grayScale();
  }
  grayScale() {
    const images = document.querySelectorAll<HTMLElement>('.footer-logos');
    let i = 0;

    console.log('7');

    function removeGreyscale() {
      var curr = i % images.length,
        prev = (curr - 1 < 0 ? images.length : curr) - 1;

      images[curr].style.webkitFilter = 'grayscale(0)';
      images[curr].style.filter = 'grayscale(0)';
      console.log('rage gray color');
      images[prev].style.webkitFilter = 'grayscale(1)';
      images[prev].style.filter = 'grayscale(1)';
      i++;
    }

    setInterval(removeGreyscale, 800);
  }
  ngOnInit(): void {
    this.grayScale();
  }
}
