import {NgModule} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/platform";
// ng类型的数据绑定需要 比如 [(ngModel)]
import {NativeScriptFormsModule} from "nativescript-angular/forms";
// wrapper of angular http
import {NativeScriptHttpModule} from "nativescript-angular/http";
import {NativeScriptRouterModule} from "nativescript-angular/router";


import {AppComponent} from "./app.component";
import {routes, navigatableComp} from "./app.routing";

@NgModule({
	imports: [
		NativeScriptModule,
		NativeScriptFormsModule,
		NativeScriptHttpModule,
		NativeScriptRouterModule,
		NativeScriptRouterModule.forRoot(routes)
	],
	declarations: [
		AppComponent,
		...navigatableComp
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
