import { CanDeactivateFn } from '@angular/router';
import { RecipeEditComponent } from '../../pages/recipe-edit/recipe-edit.component';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { IDialogData } from '../interfaces/interface';
import { map } from 'rxjs';

export const formGuard: CanDeactivateFn<RecipeEditComponent> = (component, _currentRoute, _currentState, _nextState) => {
  if (component.recipeForm.touched) {
    const dialog = inject(MatDialog);
    const dialogRef = dialog.open(DialogComponent, {
      data: dialogData
    });
    return dialogRef.componentInstance.confirm
      .pipe(map(() => {
        dialogRef.close();
        return true;
      }));
  }
  return true;
};


const dialogData: IDialogData = {
  id: 'leaveFormConfirmationModal',
  title: {
    id: 'leaveFormConfirmationModalTitle',
    title: 'Are you sure you want to leave this page?',
  },
  hasCloseBtn: true,
  bodyContent: 'You\'ve made changes to the form. All changes will be lost',
  hasFooter: true,
  buttons: [
    {
      isCloseBtn: true,
      btnClasses: ['btn', 'btn-secondary'],
      text: 'Cancel',
    },
    {
      isCloseBtn: false,
      btnClasses: ['btn', 'btn-danger', 'text-white'],
      text: 'Confirm',
    },
  ],
};
