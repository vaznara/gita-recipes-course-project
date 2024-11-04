import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'rcp-recipe-view',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.scss'
})
export class RecipeViewComponent implements OnInit {

  steps: string[] = [
    "To prepare crust add graham crackers to a food processor and process until you reach fine crumbs.Add melted butter and pulse 3 - 4 times to coat crumbs with butter.",
    "Pour mixture into a 20cm(8”) tart tin.Use the back of a spoon to firmly press the mixture out across the bottom and sides of the tart tin.Chill for 30 min.",
    "Begin by adding the marshmallows and melted butter into a microwave safe bowl.Microwave for 30 seconds and mix to combine.Set aside.",
    "Next, add the gelatine and water to a small mixing bowl and mix to combine.Microwave for 30 seconds.",
    "Add the cream cheese to the marshmallow mixture and use a hand mixer or stand mixer fitted with a paddle attachment to mix until smooth.",
    "Add the warm cream and melted gelatin mixture and mix until well combined.",
    "Add 1 / 3 of the mixture to a mixing bowl, add purple food gel and mix until well combined.Colour 1 / 3 of the mixture blue.Split the remaining mixture into two mixing bowls, colour one pink and leave the other white.",
    "Pour half the purple cheesecake mixture into the chill tart crust.Add half the blue and then add the remaining purple and blue in the tart tin.Use a spoon to drizzle some pink cheesecake on top.Use a skewer or the end of a spoon to swirl the pink.Add some small dots of the plain cheesecake mixture to create stars and then sprinkle some more starts on top before chilling for 2 hours.",
    "Slice with a knife to serve.",
  ]

  ingredients: string[] = [
    "300g marshmallows",
    "175g unsalted butter, melted",
    "500g Philadelphia cream cheese, softened",
    "250ml thickened/whipping cream, warm",
    "3 tbsp powdered gelatin + 3 tbsp water",
    "5 drops purple food gel",
    "3 drops blue food gel"
  ]

  ingredientsFormGroup: FormGroup = new FormGroup({
    ingredients: new FormArray([
      new FormControl(false)
    ])
  })

  ngOnInit(): void {
    for (let i = 0; i < this.ingredients.length; i++) {
      this.ingredientsArr.push(
        new FormControl(false)
      )
    }
  }

  get ingredientsArr(): FormArray {
    return this.ingredientsFormGroup.get('ingredients') as FormArray;
  }
}
