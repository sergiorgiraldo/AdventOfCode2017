class Particle {
    private static regex = /p=<(.+),(.+),(.+)>, v=<(.+),(.+),(.+)>, a=<(.+),(.+),(.+)>/;
    
    private id_!: number;
    private position_!: number[];
    private velocity!: number[];
    private acceleration!: number[];

    public get position(): number[] {
        return this.position_;
    }
    private set position(p) {
        this.position_ = p;
    }

    public get id(): number {
        return this.id_;
    }
    private set id(i) {
        this.id_ = i;
    }

    constructor(input: string, id: number) {
        const matches = Particle.regex.exec(input);
        
        if (matches){ //p=< 6,0,0>, v=< 3,0,0>, a=< 0,0,0>
            const values = matches.slice(1).map(Number);
            
            this.position = values.slice(0, 3);
            this.velocity = values.slice(3, 6);
            this.acceleration = values.slice(6, 9);
            this.id = id;
        }
        else{
            throw new Error("failed to create particle: " + input);
        }
    }

    public nextState(): void {
       this.position.map((_, i) => {
            this.velocity[i] += this.acceleration[i];
            this.position[i] += this.velocity[i];        
        });

    }

    public manhattanDistance(): number {
        return this.position.map((coord) => Math.abs(coord)).reduce((acc, curr) => acc + curr);
    }
}

class Day20 {
	public helpers = require("./helpers");

    public parse(lines: string[]): Particle[] {
        return lines.map((line, i) => new Particle(line, i));
    }

    public moveParticles(lines: string[]): number {
        let particles = this.parse(lines);

        let previousClosestParticle: Particle|undefined = undefined;
        let runs = 0;
        
        while (true) {
            particles.forEach((particle) => particle.nextState());

            let closestParticule = particles.reduce((closest, current) =>
                closest.manhattanDistance() <= current.manhattanDistance() ? closest : current);

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

    public checkCollisions(particles_: Particle[]): Particle[]{
        const samePosition = (arrA: number[], arrB: number[])=>{
            for (let i = 0; i < arrA.length; i++) {
                if (arrA[i] !== arrB[i]) return false; 
              }
              
              return true; 
        };

        let particles = particles_.slice();

        // we go backwards because we are going to remove elements in the run
        // also, that's why I must keep a reference to the compared article (it can shift in the array)  
        for(let i = particles.length - 1; i >=0; i--) {
                let compare = particles[i];

                let deleted = false;
                for (let j = particles.length - 1; j >= 0; j--) {
                    if (samePosition(compare.position,particles[j].position) && compare.id != particles[j].id){
                        particles.splice(j, 1);
                        deleted = true;
                    }
                }
                if (deleted) particles.splice(particles.indexOf(compare), 1);
        }    
        return particles;
    }

 	public solveForFirstStar(lines: string[]) {
		return this.moveParticles(lines);
	}

	public solveForSecondStar(lines:string[]) {
		return this.getSurvivors(lines);
	}
}

export default Day20;
