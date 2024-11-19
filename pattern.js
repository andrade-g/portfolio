function pattern(vid) {
    for (let y = 0; y < height; y += raio) {
        for (let x = 0; x < width; x += raio) {
            let i = 4 * (y * width + x); // Forma correta considerando densidade de pixels + pixels no p5
            let cor = color(
                vid.pixels[i],
                vid.pixels[i + 1],
                vid.pixels[i + 2],
            );
            let brilho = brightness(cor);

            if (brilho > 5) {
                if (brilho <= 35) {
                    noStroke();
                    fill(tone);
                    square(x, y, raio, 2);
                }
                if (brilho > 35 && brilho < 60) {
                    noFill();
                    stroke(tone);
                    strokeWeight(2);
                    line(x - raio / 2, y - raio / 2, x + raio / 2, y + raio / 2);
                    line(x - raio / 2, y + raio / 2, x + raio / 2, y - raio / 2);
                }
                if (brilho >= 60 && brilho < 92) {
                    noFill();
                    stroke(tone);
                    strokeWeight(2);
                    square(x, y, raio - raio / 2, 2);
                }
                if (brilho >= 92) {
                    noStroke();
                    fill(tone);
                    square(x, y, raio - raio / 2, 2);
                }
            }
        }
    }
}