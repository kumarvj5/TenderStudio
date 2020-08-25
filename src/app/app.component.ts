import { Component, OnInit } from '@angular/core';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TenderStudio';
/**
 *
 */
constructor(private router: Router) {
}
ngOnInit(): void{
  this.router.navigateByUrl('/dashboard');
}
  public selected = 'Dashboard';

    public items: Array<any> = [
        { text: 'Dashboard', icon: 'k-i-thumbnails-up', selected: true },
        { separator: true },
        { text: 'Expenditures', icon: 'k-i-list-numbered' },
        { separator: true },
    ];

    public onSelect(ev: DrawerSelectEvent): void {
        this.selected = ev.item.text;
        if (this.selected === "Dashboard") {
        this.router.navigateByUrl('/dashboard');
        }
        else{
        this.router.navigateByUrl('/expenditures');
        }
    }
    public imageClick(){
      this.router.navigateByUrl('/');
    }
}
