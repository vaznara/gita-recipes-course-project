import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, RecipeService } from '../../shared/services';
import { concatMap, take } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';
import { ApiErrorHandlerService, RcpError } from '../../shared/services/api-error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'rcp-recipe-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEditComponent {

  recipeForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    imgPath: new FormControl('', [Validators.required]),
    shortDescription: new FormControl('', [Validators.required, Validators.minLength(100)]),
    preparationTime: new FormControl(1, [Validators.required, Validators.min(1)]),
    servingCount: new FormControl(1, [Validators.required, Validators.min(1)]),
    ingredientsBlock: new FormArray([
      new FormGroup({
        ingredientsBlocktitle: new FormControl(''),
        ingredients: new FormArray([])
      })
    ]),
    instructions: new FormArray([]),
    steps: new FormArray([])
  })

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private storageService: StorageService,
    private errorHandler: ApiErrorHandlerService,
    private dialog: MatDialog
  ) { }

  get ingredientBlocks(): FormArray {
    return this.recipeForm.get('ingredientsBlock') as FormArray;
  }

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  getBlockIngredients(idx: number): FormArray {
    return this.ingredientBlocks.at(idx).get('ingredients') as FormArray;
  }

  addIngredientBlock(): void {
    this.ingredientBlocks.push(this.createIngredientsBlockFormGroup());
  }

  createIngredientsBlockFormGroup(): FormGroup {
    return new FormGroup({
      ingredientsBlocktitle: new FormControl(''),
      ingredients: new FormArray([new FormControl('')])
    })
  }

  addIngredient(idx: number): void {
    this.getBlockIngredients(idx).push(
      new FormControl('')
    )
  }

  removeIngredient(idx: number, ingIdx: number): void {
    this.getBlockIngredients(idx).removeAt(ingIdx);
  }

  removeStep(idx: number): void {
    this.steps.removeAt(idx);
  }

  addStep(): void {
    this.steps.push(new FormControl(''));
  }

  uploadImage(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (!files) {
      this.dialog.open(ErrorDialogComponent, {
        data: new RcpError({ name: 'Error!', message: 'Please choose file.' })
      });
      return;
    }

    const imagePathControl = this.recipeForm.get('imgPath');

    // If image changed - delete old one
    if (imagePathControl?.value) {
      this.deleteImage(imagePathControl?.value);
    }

    this.storageService.uploadImage(files[0]).pipe(take(1))
      .subscribe(res => {
        const imagePath = res.metadata.fullPath;
        this.recipeForm.get('imgPath')?.setValue(imagePath);
      })
  }

  deleteImage(imagePath: string): void {
    this.storageService.deletImage(imagePath).pipe(take(1))
      .subscribe()
  }

  onSubmit(): void {
    this.authService.currentUser$.pipe(
      concatMap(user => {
        return this.recipeService.createRecipe({ ...this.recipeForm.value, author: user?.uid })
      })
    ).subscribe()
  }
}
