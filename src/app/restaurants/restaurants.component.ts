import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants : Restaurant[] = [];

  constructor(private rs: RestaurantsService) { }

  ngOnInit(): void {
    this.rs.restaurants().subscribe(retorno => {
      this.restaurants = retorno;
    });
  }

}