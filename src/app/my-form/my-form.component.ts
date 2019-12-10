import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Observable, Subject, Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { NameService } from "../name.service";

@Component({
  selector: "app-my-form",
  templateUrl: "./my-form.component.html",
  styleUrls: ["./my-form.component.scss"]
})
export class MyFormComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  subscription = new Subscription();

  values$: Observable<any>;

  @ViewChild("form", { static: false }) form: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    private nameService: NameService
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({ name: ["", Validators.required] });
		this.values$ = this.myForm.valueChanges.pipe(
			debounceTime(500),
		);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get name() {
    return this.myForm.get("name");
  }

  get names() {
    return this.nameService.names;
  }

  handleSubmit() {
    this.nameService.addName(this.name.value);
    this.myForm.reset();
    this.form.resetForm();
  }
}
