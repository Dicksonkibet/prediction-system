import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Feature {
  icon: string;
  title: string;
  description: string;
  hovered: boolean;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  features: Feature[] = [
    {
      icon: 'graph-up',
      title: 'Risk Analysis',
      description: 'Advanced machine learning algorithms analyze borrower data to predict credit risk with high accuracy.',
      hovered: false
    },
    {
      icon: 'lightning',
      title: 'Real-time Processing',
      description: 'Get instant risk assessments and credit decisions powered by our ML models.',
      hovered: false
    },
    {
      icon: 'shield-check',
      title: 'Secure Platform',
      description: 'Enterprise-grade security ensures your data is protected at all times.',
      hovered: false
    },
    {
      icon: 'bar-chart',
      title: 'Detailed Reports',
      description: 'Access comprehensive risk reports and lending insights through our dashboard.',
      hovered: false
    }
  ];

  constructor(private router: Router) {}
 

  ngOnInit(): void {}

  toggleHover(index: number, isHovered: boolean): void {
    this.features[index].hovered = isHovered;
  }}
