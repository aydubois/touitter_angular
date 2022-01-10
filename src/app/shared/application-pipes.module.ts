import { NgModule } from "@angular/core";
import { SafePipe } from "./pipe/safe-html.pipe";

@NgModule({
    imports: [
      // dep modules
    ],
    declarations: [ 
      SafePipe
    ],
    exports: [
      SafePipe
    ]
  })
  export class ApplicationPipesModule {}