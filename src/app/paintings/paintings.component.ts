import { Component, OnInit } from '@angular/core';
import { PaintingsService } from '../services/paintings.service';
import { Painting } from './../models/Painting';

@Component({
  selector: 'app-paintings',
  templateUrl: './paintings.component.html',
  styleUrls: ['./paintings.component.scss']
})
export class PaintingsComponent implements OnInit {

  public paintings$: Promise<Painting[]> | undefined;
  constructor(
    private paintingsService: PaintingsService
  ) { }

  ngOnInit(): void {
    this.paintings$ = this.paintingsService.getAllPaintings();
    console.log(this.paintings$);
  }

}
