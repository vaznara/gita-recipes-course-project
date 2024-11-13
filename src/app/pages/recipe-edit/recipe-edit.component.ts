import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, CategoryService, RecipeService } from '../../shared/services';
import { combineLatestWith, concatMap, Subject, take, takeUntil } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';
import { RcpError } from '../../shared/services/api-error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ICategoryResponse, IIngredient, IRecipeResponse } from '../../shared/interfaces/interface';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'rcp-recipe-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  ngUnsubscribe$: Subject<void> = new Subject();

  recipeForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    imgPath: new FormControl('', [Validators.required]),
    shortDescription: new FormControl('', [Validators.required, Validators.minLength(50)]),
    preparationTime: new FormControl(1, [Validators.required, Validators.min(1)]),
    servingCount: new FormControl(1, [Validators.required, Validators.min(1)]),
    categoryKey: new FormControl('', [Validators.required]),
    ingredientsBlock: new FormArray([]),
    steps: new FormArray([
      new FormControl('', [Validators.required, Validators.minLength(11)])
    ])
  });

  recipeKey?: string;
  categories: ICategoryResponse[] = [];
  imageFile: File | null = null;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private storageService: StorageService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().pipe(take(1))
      .subscribe(res => {
        this.categories = res;
        this.cdr.markForCheck();
      })

    const recipe = history.state.recipe;

    if (recipe) {
      this.titleService.setTitle(`Edit recipe: ${recipe.recipe.title}`)
      this.patchValue(recipe);
    } else {
      this.ingredientBlocks.push(this.ingredientsBlockFormGroup);
      this.addIngredient(0);
    }
  }

  patchValue(recipe: IRecipeResponse): void {
    recipe.recipe.ingredientsBlock.forEach((block, idx) => {
      this.ingredientBlocks.push(this.ingredientsBlockFormGroup);
      this.ingredientBlocks.at(idx).get('ingredientsBlockTitle')?.patchValue(block.ingredientsBlockTitle)
      while (this.getBlockIngredients(idx).length < block.ingredients.length) {
        this.getBlockIngredients(idx).push(this.getIngredientFormGroup())
      }
    })

    this.recipeKey = recipe.key;
    this.recipeForm.patchValue(recipe.recipe);
  }

  getIsRequired(controlName: string): boolean {
    return !!this.recipeForm.get(controlName)?.hasValidator(Validators.required)
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

  get title(): AbstractControl | null {
    return this.recipeForm.get('title');
  }

  get categoryKey(): AbstractControl | null {
    return this.recipeForm.get('categoryKey');
  }

  get shortDescription(): AbstractControl | null {
    return this.recipeForm.get('shortDescription');
  }

  get preparationTime(): AbstractControl | null {
    return this.recipeForm.get('preparationTime');
  }

  get servingCount(): AbstractControl | null {
    return this.recipeForm.get('servingCount');
  }

  getBlockIngredients(idx: number): FormArray {
    return this.ingredientBlocks.at(idx).get('ingredients') as FormArray;
  }

  addIngredientBlock(): void {
    this.ingredientBlocks.push(this.ingredientsBlockFormGroup);
  }

  get ingredientsBlockFormGroup(): FormGroup {
    return new FormGroup({
      ingredientsBlockTitle: new FormControl('', [Validators.required]),
      ingredients: new FormArray([])
    })
  }

  addIngredient(idx: number): void {
    this.getBlockIngredients(idx).push(this.getIngredientFormGroup());
  }

  getIngredientFormGroup(ingredient?: IIngredient): FormGroup {
    return new FormGroup({
      name: new FormControl(ingredient?.name ?? '', [Validators.required, Validators.minLength(4)]),
      unit: new FormControl(ingredient?.unit ?? '', [Validators.required]),
      quantity: new FormControl(ingredient?.quantity ?? 0.1, [Validators.required, Validators.min(0.1)])
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

  handleImage(event: Event): void {
    const target = (event.target as HTMLInputElement);
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      this.imageFile = target.files[0];
      reader.onload = (event: ProgressEvent): void => {
        this.imagePath?.setValue((<FileReader>event.target).result);
        this.cdr.detectChanges();
      }

      reader.readAsDataURL(target.files[0]);
    }
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
        this.recipeForm.get('imgPath')?.setValue(res);
        this.cdr.detectChanges();
      })
  }

  deleteImage(imagePath: string): void {
    this.storageService.deletImage(imagePath).pipe(take(1))
      .subscribe()
  }

  onSubmit(): void {
    if (this.imageFile) {
      this.authService.currentUser$.pipe(
        takeUntil(this.ngUnsubscribe$),
        combineLatestWith(this.storageService.uploadImage(this.imageFile)),
        concatMap(([user, imagePath]) => {
          this.imagePath?.setValue(imagePath, { emitValue: false });
          const recipe = { ...this.recipeForm.value, author: user?.uid, isFeatured: false, isInMainCarousel: false };
          return this.recipeKey
            ? this.recipeService.updateRecipe({ [this.recipeKey]: recipe })
            : this.recipeService.createRecipe(recipe)
        })
      ).subscribe(res => {
        this.router.navigate([`/recipe/${this.recipeKey ?? res?.name}`]);
      })
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
