import { parse } from 'csv-parse';
import fs from 'fs';

const habitablePlanets = [];

const isHabitable = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

fs.createReadStream('keplar_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if (isHabitable(data)) {
            habitablePlanets.push(data)
        }
    })
    .on('error', err => {
        console.log(err)
    })
    .on('end', () => {
        console.log(habitablePlanets.map(planet => {
            return planet['kepler_name']
        }));
        console.log(`Number of habitable planets: ${habitablePlanets.length}`)
    }) 