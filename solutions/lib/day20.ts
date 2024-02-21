class Particle {
    private static regex = /p=<(.+),(.+),(.+)>, v=<(.+),(.+),(.+)>, a=<(.+),(.+),(.+)>/;
    
    public position!: number[];
    public velocity!: number[];
    public acceleration!: number[];
    
    constructor(input: string, public id: number) {
        const matches = Particle.regex.exec(input);
        
        if (matches){
            const values = matches.slice(1).map(Number);

            this.position = values.slice(0, 3);
            this.velocity = values.slice(3, 6);
            this.acceleration = values.slice(6, 9);
        }
    }

    public nextState(): void {
       this.position.map((_, idx) => {
            this.velocity[idx] += this.acceleration[idx];
            this.position[idx] += this.velocity[idx];        
        });

    }

    public distanceFromOrigin(): number {
        return this.position.map((coord) => Math.abs(coord)).reduce((acc, curr) => acc + curr);
    }
}

class Day20 {
	public helpers = require("./helpers");

    public moveParticles(lines: string[]): number {
        let particles = this.parse(lines);

        let previousClosestParticle: Particle|undefined = undefined;
        let runs = 0;
        
        while (true) {
            particles.forEach((particle) => particle.nextState());

            let closestParticule = particles.reduce((closest, current) =>
                closest.distanceFromOrigin() <= current.distanceFromOrigin() ? closest : current);

            if (previousClosestParticle === closestParticule) {
                runs++;
            } 
            else {
                previousClosestParticle = closestParticule;
                runs = 1;
            }
            
            //tried with 50, 100, 150, 200. after 150 it is always the same
            if (runs > 150) {
                return previousClosestParticle.id;
            }
        }
    }

    public checkCollisions(particles_: Particle[]): Particle[]{
        const arePositionsEqual = (arrA: number[], arrB: number[])=>{
            for (let i = 0; i < arrA.length; i++) {
                if (arrA[i] !== arrB[i]) return false; 
              }
              
              return true; 
        };

        let particles = particles_.slice();

        for(let i = particles.length; i >=0; i--)
        {
            if (i < particles.length) {
                let compareParticle = particles[i];

                let deleted = false;
                for (let j = particles.length - 1; j >= 0; j--) {
                    if (arePositionsEqual(compareParticle.position,particles[j].position) && 
                        compareParticle.id != particles[j].id){
                        particles.splice(j, 1);
                        deleted = true;
                    }
                }
                if (deleted)
                    particles.splice(particles.indexOf(compareParticle), 1);
            }
        }    
        return particles;
    }


    public getSurvivors(lines: string[]): number {
        let particles = this.parse(lines);

        let runs = 0;
        
        while (true) {
            particles.forEach((particle) => particle.nextState());

            let particlesWithoutCollisions = this.checkCollisions(particles);

            if (particlesWithoutCollisions.length === particles.length) {
                runs++;
            } 
            else {
                particles = particlesWithoutCollisions;
                runs = 1;
            }

            if (runs > 150) { //using magic number from part 1
                return particles.length;
            }
        }
    }

    public parse(lines: string[]): Particle[] {
        return lines.map((line, idx) => new Particle(line, idx));
    }

	public solveForFirstStar(lines: string[]) {
		return this.moveParticles(lines);
	}

	public solveForSecondStar(lines:string[]) {
		return this.getSurvivors(lines);
	}
}

export default Day20;
