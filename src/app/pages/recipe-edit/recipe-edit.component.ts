import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, CategoryService, RecipeService } from '../../shared/services';
import { concatMap, Subject, take } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';
import { RcpError } from '../../shared/services/api-error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ICategoryResponse } from '../../shared/interfaces/interface';

@Component({
  selector: 'rcp-recipe-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  ngUnsubscribe$: Subject<void> = new Subject();

  recipeForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    imgPath: new FormControl('', [Validators.required]),
    shortDescription: new FormControl('', [Validators.required, Validators.minLength(100)]),
    preparationTime: new FormControl(1, [Validators.required, Validators.min(1)]),
    servingCount: new FormControl(1, [Validators.required, Validators.min(1)]),
    categoryKey: new FormControl('', [Validators.required]),
    ingredientsBlock: new FormArray([
      new FormGroup({
        ingredientsBlocktitle: new FormControl(''),
        ingredients: new FormArray([
          new FormGroup({
            name: new FormControl('', [Validators.required]),
            unit: new FormControl('', [Validators.required]),
            quantity: new FormControl(0.1, [Validators.required, Validators.min(0.1)])
          })
        ])
      })
    ]),
    instructions: new FormArray([]),
    steps: new FormArray([
      new FormControl('', [Validators.required])
    ])
  });

  categories: ICategoryResponse[] = [];

  imageSource: string = 'https://placehold.co/1200x200';

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private storageService: StorageService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().pipe(take(1))
      .subscribe(res => {
        this.categories = res;
      })
  }

  get ingredientBlocks(): FormArray {
    return this.recipeForm.get('ingredientsBlock') as FormArray;
  }

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  get imagePath(): AbstractControl | null {
    return this.recipeForm.get('imgPath');
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
    this.getBlockIngredients(idx).push(this.ingredientFormGroup);
  }

  get ingredientFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      quantity: new FormControl(0.1, [Validators.required, Validators.min(0.1)])
    })
  }

  removeIngredient(idx: number, ingIdx: number): void {
    this.getBlockIngredients(idx).removeAt(ingIdx);
  }

  removeStep(idx: number): void {
    this.steps.removeAt(idx);
  }

  addStep(): void {
    this.steps.push(new FormControl('', [Validators.required]));
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
        this.imageSource = res;
        this.recipeForm.get('imgPath')?.setValue(res);
        this.cdr.detectChanges();
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

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
