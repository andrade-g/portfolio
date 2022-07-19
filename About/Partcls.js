class Partcls {
    constructor(x, y, t, r) {
        this.Ox = x; // Posição original
        this.Oy = y;
        this.pos = createVector(x, y); // Posição atual
        this.tipo = t; // Tipo de partícula
        this.raio = r; // Raio baseado na densidade
        this.mouseDist = 0; // Distancia do mouse
        this.vel = createVector(0, 0); // Velocidade da partícula
        this.tone = color(90, 30, 250); // Cor do duotone
        this.distance = 0;
    }
    /*----Move as particulas----*/
    move() {
        this.vel.mult(0.92); //Decaimento da velocidade
        this.pos.add(this.vel);
    }

    /*----Mostra as partículas----*/
    show() {
        push();
        translate(this.pos.x, this.pos.y);
        if (this.tipo == 1) {
            noStroke();
            fill(this.tone);
            square(this.pos.x, this.pos.y, this.raio, 2);
        }
        if (this.tipo == 2) {
            noFill();
            stroke(this.tone);
            strokeWeight(2);
            line(
                this.pos.x - this.raio / 2,
                this.pos.y - this.raio / 2,
                this.pos.x + this.raio / 2,
                this.pos.y + this.raio / 2
            );
            line(
                this.pos.x - this.raio / 2,
                this.pos.y + this.raio / 2,
                this.pos.x + this.raio / 2,
                this.pos.y - this.raio / 2
            );
        }
        if (this.tipo == 3) {
            noFill();
            stroke(this.tone);
            strokeWeight(2);
            square(this.pos.x, this.pos.y, this.raio - this.raio / 2, 2);
        }
        if (this.tipo == 4) {
            noStroke();
            fill(this.tone);
            square(this.pos.x, this.pos.y, this.raio - this.raio / 2, 2);
        }
        pop();
    }

    /*----Adiciona a velocidade do mouse às partículas----*/
    avoidMouse() {
        this.mouseDist = dist(mouseX / 2, mouseY / 2, this.pos.x, this.pos.y);
        if (this.mouseDist <= this.raio * 2) {
            let repulse = createVector(this.pos.x, this.pos.y);
            repulse.sub(mouseX / 2, mouseY / 2);
            repulse.normalize();
            repulse.mult(6);
            this.vel.add(repulse);
        }
    }

    /*----Traz de volta para a posição inicial----*/
    gravity() {
        this.distance = dist(this.pos.x, this.pos.y, this.Ox, this.Oy);
        if (this.distance > 0) {
            // Quanto mais próx. de 0 for a distancia da pos original, menor será a velocidade
            let accel = map(this.distance, 0, 20, 0, 1);
            let g = createVector(this.Ox, this.Oy);
            g.sub(this.pos);
            g.normalize();
            g.mult(accel);
            //console.log(accel);
            this.vel.add(g);
        }
    }
}  