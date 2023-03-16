import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class QuestionFilter implements PipeTransform {
  transform(data: any, key: string, value: string): any {
    if (!data || data.length === 0) {
      return [];
    }

    return data.filter((item: any) =>
      item[key].toLowerCase().includes(value.toLocaleLowerCase())
    );
  }
}
