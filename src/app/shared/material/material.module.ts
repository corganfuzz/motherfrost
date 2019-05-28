import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule,
	MatCardModule,
	MatDialog,
	MatDialogModule,
	MatIconModule,
	MatFormFieldModule,
	MatInputModule,
	MatListModule,
	MatSidenavModule,
	MatToolbarModule
} from '@angular/material';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatButtonModule,
		MatCardModule,
		MatDialogModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatListModule,
		MatSidenavModule,
		MatToolbarModule
	],
	exports: [
		MatButtonModule,
		MatCardModule,
		MatDialogModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatListModule,
		MatSidenavModule,
		MatToolbarModule
	],
	providers: [MatDialog]
})
export class MaterialModule {}
