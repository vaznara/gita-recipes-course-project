import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  onSubmit(): void {
  }
}
