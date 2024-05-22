import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

export type MenuItem = {
  icon: string;
  label: string;
  route: any;
};

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [RouterModule, CommonModule, MatListModule, MatIconModule],
  template: `
    <div class="sidenav-header">
      <img
        src="assets/img/avatar.jpg"
        [width]="profilePicSize()"
        [height]="profilePicSize()"
      />
      <div class="header-text" [class.hide-hader-text]="sideNavCollapsed()">
        <h1>ADMIN</h1>
        <p>Rupesh Babu</p>
      </div>
    </div>
    <mat-nav-list>
      <a
        mat-list-item
        class="menu-item"
        *ngFor="let item of menuItems()"
        [routerLink]="item.route"
        routerLinkActive="selected-menu-item"
        #rla="routerLinkActive"
        [activated]="rla.isActive"
      >
        <mat-icon
          [fontSet]="
            rla.isActive ? 'material-icons' : 'material-icons-outlined'
          "
          matListItemIcon
          >{{ item.icon }}</mat-icon
        >
        <span matListItemTitle *ngIf="!sideNavCollapsed()">{{
          item.label
        }}</span>
      </a>
    </mat-nav-list>
  `,
  styles: `

      :host * {
        transition: all 500ms ease-in-out;
      }
    .sidenav-header {
      padding-top: 24px;
      text-align:center;

      > img {
        border-radius: 100%;
        object-fit: cover;
        margin-bottom: 10px;
      }
      .hader-text {
        height:3rem;
        > h2{
          margin:0;
          font-size:1rem;
          line-height: 1.5rem;
        }
        > p {
          margin:0;
          font-size: 0.8rem;
        }
      }
    }
    .menu-item {
      border-left: 5px solid;
      border-left-color: rgba(0,0,0,0);

    }

    .hide-hader-text {
      opacity: 0;
      height: 0px !important;
    }
    .selected-menu-item {
      border-left-color: blue;
      background: rgba(0,0,0,0.05);
    }
  `,
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false);

  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
    },
    {
      icon: 'video_library',
      label: 'Content',
      route: 'content',
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      route: 'analytics',
    },
    {
      icon: 'comment',
      label: 'Comments',
      route: 'comments',
    },
  ]);

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));
}
