import { Component } from '@angular/core';
import {Container, Engine, ISourceOptions} from "tsparticles-engine";
import {loadFull} from "tsparticles";

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent {

  particlesOptions: ISourceOptions =
      {
        background: { color: { value: "#000", }, },
        fpsLimit: 30,
        interactivity:
            {
              events:
                  {
                    onClick:
                        {
                          enable: true,
                          mode: ["repulse"],
                        },
                    onHover:
                        {
                          enable: true,
                          mode: ["attract"],
                        },
                    resize: true,
                  },
              modes:
                  {
                    repulse:
                        {
                          distance: 200,
                          duration: 0.4,
                          speed:1
                        },
                    attract:
                        {
                          distance: 200,
                          duration: 0.4,
                          speed:2
                        }
                  },
            },
        particles:
            {
              color: { value: "#4ff",},
              links:
                  {
                    color: "#4ff",
                    distance: 200,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                  },
              collisions: { enable: false,},
              move:
                  {
                    direction: "none",
                    enable: true,
                    outModes: { default: "bounce",},
                    random: true,
                    speed: 1,
                    straight: true,
                  },
              number:
                  {
                    density:
                        {
                          enable: true,
                          area: 800,
                        },
                    value: 100,
                  },
              opacity: { value: 0.5, },
              shape: { type:  "circle", },
              size: { value: { min: 1, max: 5}, },
            },
        detectRetina: true,
      }

  async particlesInit(engine: Engine): Promise<void>
  {
    console.log("init", engine);
    await loadFull(engine);
  }

  public particlesLoaded(container: Container): void {
    console.log("loaded", container);
  }

}
