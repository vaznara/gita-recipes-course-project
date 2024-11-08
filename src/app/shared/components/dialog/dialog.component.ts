import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDialogData, IDialogDataButton } from '../../interfaces/interface';



@Component({
  selector: 'rcp-dialog',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {

  @Output() confirm: EventEmitter<void> = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData,
    public dialogRef: MatDialogRef<DialogComponent>) { }

  onClick(btn: IDialogDataButton): void {
    btn.isCloseBtn ? this.dialogRef.close() : this.confirm.emit();
  }

}
