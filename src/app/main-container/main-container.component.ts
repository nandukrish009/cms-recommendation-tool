import {
  Attribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  ValidatorFn,
  Validators,
  FormArray,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery';
import { ViewportScroller } from '@angular/common';
import { FormFields } from '../form-fields';
import { BehaviorSubject, map, scan, takeWhile, tap, timeout } from 'rxjs';
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css'],
})
export class MainContainerComponent implements OnInit {
  generalForm!: FormGroup;
  contentForm!: FormGroup;
  marketForm!: FormGroup;
  technicalForm!: FormGroup;
  developmentForm!: FormGroup;

  submitted = false;
  scroll: string = '';
  primary_function_website: string = '';
  users_you_expect_to_visit: string = '';
  simultaneously_site_use: string = '';
  expect_visitors_countries: string = '';
  content_of_propsed_site: string = '';
  frequently_content_change: string = '';
  website_customised_visitiors: string = '';

  general_req_step = false;
  content_managment_step = false;
  marketing_step = false;
  technical_it = false;
  technical_development = false;
  step = 1;
  generalFormData: any = [];
  timelineData: any;
  modelValueOne: any = [[]];
  modelValueTwo: any = [[]];
  modelValueThree: any = [[]];
  modelValueFour: any = [[]];
  modelValueFive: any = [[]];

  sendData: any = {};
  getData: any = {};
  mapped: any = [];
  isChecked = false;
  i: any = [];
  j: any = [];
  first: any;
  second: any;
  third: any;
  ansArray: any = [];
  ansValue: any = {};
  arrayValue: any = [];
  results: any = [];
  ids: any = [];
  flattenedArray: any = [];
  selectedValue: any;
  // IsValid = false;

  stepperOne: any = {
    start: 0,
    end: 7,
  };

  stepperTwo: any = {
    start: 7,
    end: 12,
  };

  stepperThree: any = {
    start: 12,
    end: 17,
  };

  stepperFour: any = {
    start: 17,
    end: 22,
  };

  stepperFive: any = {
    start: 22,
    end: 27,
  };
  generalFormDataMongo: any = [];

  //  form filter section
  constructor(
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private router: Router,
    private http: HttpClient,
    private scroller: ViewportScroller,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  formValue(e: any, opt: any, name: any) {
    this.selectedValue = e.target.value;
    const checkArray: FormArray = this.generalForm.get(
      'checkArray'
    ) as FormArray;

    if (e.target.type == 'checkbox' && e.target.checked == true) {
      checkArray.push(new FormControl(e.target.value));
      console.log(e.target.value);
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }

    if (e.target.type == 'checkbox' && e.target.checked == true) {
      e.target.closest('.label_container').classList.add('radioBG');
    } else {
      e.target.closest('.label_container').classList.remove('radioBG');
    }
    if (e.target.type == 'radio' && e.target.checked == true) {
      console.log('radio');
      e.target
        .closest('.option-select-cnt')
        .querySelectorAll('.label_container')
        .forEach((label: any) => {
          label.classList.remove('radioBG');
        });

      setTimeout(() => {
        e.target.closest('.label_container').classList.add('radioBG');
      }, 10);
    } else {
      console.log('radio else');
    }
    if (e.target.type == 'checkbox' && e.target.checked == false) {
      delete this.sendData[name];
    } else {
      this.sendData[name] = opt;
    }

    this.getData = JSON.stringify(this.sendData);
    console.log(this.sendData);
    this.mapped = Object.entries(this.sendData).map(([type, value]) => ({
      type,
      value,
    }));
    this.ansArray = [];
    this.ansValue = this.ansArray;
    for (let objValue of this.mapped) {
      for (let j of this.generalFormData) {
        for (let k of j.options) {
          let ov = objValue.value;
          let kv = k.id;

          if (ov == kv) {
            this.third = k.recommendation;
            this.ansArray.push(this.third);
          }
        }
      }
    }
    this.flattenedArray = [].concat(...this.ansValue);

    console.log('arr', this.flattenedArray);

    const res = Array.from(
      this.flattenedArray.reduce(
        (
          m: { set: (arg0: any, arg1: any) => any; get: (arg0: any) => any },
          { CMS, recommendation_value }: any
        ) => m.set(CMS, (m.get(CMS) || 0) + parseInt(recommendation_value)),
        new Map()
      ),
      ([CMS, recommendation_value]) => ({
        CMS,
        recommendation_value,
      })
    );

    this.arrayValue = res;

    let valueOf = this.arrayValue.sort(
      (
        a: { recommendation_value: string },
        b: { recommendation_value: string }
      ) => parseInt(b.recommendation_value) - parseInt(a.recommendation_value)
    );
    console.log('value', valueOf);

    Object.keys(this.flattenedArray).forEach((el) => {
      for (let i = 0; i < this.arrayValue.length; i++) {
        if (this.flattenedArray[el].CMS === this.arrayValue[i].CMS) {
          this.arrayValue[i].image = this.flattenedArray[el].image;
        }
      }
    });
    console.log(this.arrayValue);
  }

  ngOnInit(): void {
    for (let j = 0; j <= 7; j++) {
      this.modelValueOne[j] = new Array(0);
    }
    for (let j = 0; j <= 7; j++) {
      this.modelValueTwo[j] = new Array(0);
    }
    for (let j = 0; j <= 7; j++) {
      this.modelValueThree[j] = new Array(0);
    }
    for (let j = 0; j <= 7; j++) {
      this.modelValueFour[j] = new Array(0);
    }
    for (let j = 0; j <= 7; j++) {
      this.modelValueFive[j] = new Array(0);
    }

    this.generalForm = this.formBuilder.group({
      primary_function_website: ['', Validators.required],
      users_you_expect_to_visit: ['', Validators.required],
      simultaneously_site_use: ['', Validators.required],
      // expect_visitors_countries: ['', Validators.required],
      country_opt_india: [''],
      country_opt_asia: [''],
      country_opt_europe: [''],
      country_opt_north_america: [''],
      country_opt_south_america: [''],
      checkArray: this.formBuilder.array([], [Validators.required]),

      content_of_propsed_site: ['', Validators.required],
      frequently_content_change: ['', Validators.required],
      website_customised_visitiors: ['', Validators.required],

      // general: this.formBuilder.array([], [Validators.required]),
    });
    this.contentForm = this.formBuilder.group({
      people_in_organisation: ['', Validators.required],
      roles_of_people_content: ['', Validators.required],
      skill_level_of_people: ['', Validators.required],
      how_content_management_performed: ['', Validators.required],
      kind_of_content_mangement: ['', Validators.required],
    });
    this.marketForm = this.formBuilder.group({
      kind_of_data_required_gathered: ['', Validators.required],
      optimising_the_site_performance: ['', Validators.required],
      one_time_landing_page: ['', Validators.required],
      data_collection_requirements: ['', Validators.required],
      asset_management_features: ['', Validators.required],
    });
    this.technicalForm = this.formBuilder.group({
      technical_architecture_cms: ['', Validators.required],
      site_need_integrate_third_party: ['', Validators.required],
      what_api_integration_looking_for: ['', Validators.required],
      ui_visual_interaction: ['', Validators.required],
      ui_framework: ['', Validators.required],
    });
    this.developmentForm = this.formBuilder.group({
      what_type_of_themes: ['', Validators.required],
      what_are_your_expectations: ['', Validators.required],
      what_would_be_your_preferred_cms: ['', Validators.required],
      how_would_you_like_to_track: ['', Validators.required],
      how_would_you_like_cms_updates: ['', Validators.required],
    });

    this.http.get('assets/timeline-data.json').subscribe((timeline) => {
      this.timelineData = timeline;
    });

    // this.http.get('assets/question.json').subscribe((data) => {
    //   this.generalFormData = data;
    // });

    this.http
      .get(
        'https://ap-south-1.aws.data.mongodb-api.com/app/rage-api-ewhwq/endpoint/cms_questionnaire'
      )
      .subscribe((dataMongo) => {
        this.generalFormData = dataMongo;
        console.log(this.generalFormData);
      });
  }

  get generalDetails() {
    return this.generalForm.controls;
  }
  get contentDetails() {
    return this.contentForm.controls;
  }
  get marketDetails() {
    return this.marketForm.controls;
  }
  get technicalDetails() {
    return this.technicalForm.controls;
  }
  get developmentDetails() {
    return this.developmentForm.controls;
  }

  resetClass() {
    setTimeout(() => {
      this.scroll = 'scroll';
    }, 100);
  }

  next() {
    if (this.step == 1) {
      this.general_req_step = true;
      if (this.generalForm.invalid) {
        scrollToFirstInvalidMsg(this.el);
        return;
      }

      this.step++;
    } else if (this.step == 2) {
      this.content_managment_step = true;
      if (this.contentForm.invalid) {
        scrollToFirstInvalidMsg(this.el);
        return;
      }
      this.step++;
    } else if (this.step == 3) {
      this.marketing_step = true;
      if (this.marketForm.invalid) {
        scrollToFirstInvalidMsg(this.el);
        return;
      }
      this.step++;
    } else if (this.step == 4) {
      this.technical_it = true;
      if (this.technicalForm.invalid) {
        scrollToFirstInvalidMsg(this.el);
        return;
      }
      this.step++;
    }
    if (this.scroll == 'scroll') {
      this.scroll = 'scroll';
    } else {
      this.scroll = 'something';
      this.resetClass();
    }
  }

  previous() {
    this.step--;

    if (this.step == 1) {
      this.content_managment_step = false;
    }
    if (this.step == 2) {
      this.marketing_step = false;
    }
    if (this.step == 3) {
      this.technical_it = false;
    }
    if (this.step == 4) {
      this.technical_development = false;
    }
  }

  submit() {
    if (this.step == 5) {
      this.technical_development = true;
      if (this.developmentForm.invalid) {
        scrollToFirstInvalidMsg(this.el);
        return;
      }
      console.log(this.arrayValue);
    }
  }

  // getClass() {
  //   if (this.generalForm.valid && this.step == 1) {
  //     return 'active';
  //   } else if (this.contentForm.valid && this.step == 2) {
  //     return 'active';
  //   } else if (this.marketForm.valid && this.step == 3) {
  //     return 'active';
  //   } else if (this.technicalForm.valid && this.step == 4) {
  //     return 'active';
  //   } else if (this.developmentForm.valid && this.step == 5) {
  //     return 'active';
  //   } else {
  //     return 'inactive';
  //   }
  // }
}

function scrollToFirstInvalidMsg(el: any) {
  // console.log(el);
  setTimeout(() => {
    const elementInScrollableDiv: any = document.querySelector(
      'form .error:first-child'
    );
    const scrollableDivElement: any = document.querySelector('.content');
    elementInScrollableDiv.scrollIntoView();
    (elementInScrollableDiv as HTMLElement).focus();
  }, 500);
}

function getTopOffset(scrollableDivElement: HTMLElement): number {
  const labelOffset = 50;

  const controlElTop = scrollableDivElement.getBoundingClientRect().top;

  const absoluteControlElTop = controlElTop + window.scrollY;

  return absoluteControlElTop - labelOffset;
}
