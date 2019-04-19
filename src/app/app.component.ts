import { Component, OnInit, QueryList, ElementRef, ViewChildren } from '@angular/core';
import uuid from 'uuid';

@Component({
  selector: 'my-app',
  template: `
  <button (click)="toggleCan()">{{canDrag ? 'Disable Drag' : 'Enable Drag'}}</button>
  <div #column class="column" [draggable]="canDrag" *ngFor="let a of [1,2,3]" [attr.data-folder]="a"
      (dragstart)="handleDragStart($event)"
      (dragenter)="handleDragEnter($event)"
      (dragover)="handleDragOver($event)"
      (dragleave)="handleDragLeave($event)"
      (drop)="handleDrop($event)"
      (dragend)="handleDragEnd($event)"><header>Folder {{a}}</header></div>
      
      <div #column class="column" [draggable]="canDrag" *ngFor="let a of [1,2]" [attr.data-file]="a"
      (dragstart)="handleDragStart($event)"
      (dragenter)="handleDragEnter($event)"
      (dragover)="handleDragOver($event)"
      (dragleave)="handleDragLeave($event)"
      (drop)="handleDrop($event)"
      (dragend)="handleDragEnd($event)"><header>File {{a}}</header></div>

      `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChildren('column') columns: QueryList<ElementRef>;

canDrag = false;

toggleCan() {
  this.canDrag = !this.canDrag;
}

  dragSrcEl = null;
  files: any[];
  folders: any[];

    handleDragStart(e) {
      // Target (this) element is the source node.
      e.target.style.opacity = '0.4';
 
      this.dragSrcEl = e.target;
    }

    handleDragOver(e) {
      e.preventDefault();
      
      return false;
    }

    handleDragEnter(e) {
      e.target.classList.add('over');
    }

    handleDragLeave(e) {
      e.target.classList.remove('over');
    }

    handleDrop(e) {
        e.stopPropagation();

      // Don't do anything if dropping the same column we're dragging.
      if (this.dragSrcEl !== e.target) {
        if (this.dragSrcEl.dataset.folder) {
          console.log('This is from folder ' + this.dragSrcEl.dataset.folder);
        } else if (this.dragSrcEl.dataset.file) {
          console.log('This is from file ' + this.dragSrcEl.dataset.file);
        }
        if (e.target.dataset.folder) {
          console.log('This is to folder ' + e.target.dataset.folder);
        } else if (e.target.dataset.file) {
          console.log('This is to file ' + e.target.dataset.file);
        }

      }

      return false;
    }


    handleDragEnd(e) {
      e.target.style.opacity = '1';
      this.columns.forEach(col => {
        col.nativeElement.classList.remove('over');
      })
    }

}
