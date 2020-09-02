import { Component, SimpleChanges, ChangeDetectorRef } from "@angular/core";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  state,
  keyframes
} from "@angular/animations";
import { filter, findIndex } from "rxjs/operators";

// export const fadeAnimation = trigger("fadeAnimation", [
//   transition(":enter", [
//     style({ opacity: 0 }),
//     animate("300ms", style({ opacity: 1 }))
//   ]),
//   transition(":leave", [
//     style({ opacity: 1 }),
//     animate("300ms", style({ opacity: 0 }))
//   ])
// ]);

/**
 * change the animnation from transition to state
 * use [@listAnimation]="sate"
 */

const listAnimation = [
  trigger("listAnimation", [
    transition("void => *", [
      animate(
        500,
        keyframes([
          style({ opacity: 0 }),
          style({
            backgroundColor: "#bee0ff",
            opacity: 1
          }),
          style({ opacity: 1 })
        ])
      )
    ]),
    transition("* => void", [
      animate(
        500,
        keyframes([
          style({ opacity: 1 }),
          style({ opacity: 0 })
        ])
      )
    ])
  ])
];

let nx = 0;
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [listAnimation]
})
export class AppComponent {
  items = [];

  constructor(private cd: ChangeDetectorRef) {}

  add() {
    this.items.push(nx++);
  }

  update() {
    const r = Math.floor(Math.random() * this.items.length);
    const index = this.items.indexOf(r);
    this.items[index] = r + 1;
  }

  remove(e) {
    this.items = this.items.filter(item => e !== item);
  }
}
