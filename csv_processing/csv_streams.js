const csv = require('fast-csv');
const fs = require('fs');
const ms = require('moment');

const stream = csv.format({
    headers: true,
    quote: '"'
});
let date, prev, day, formed, buff = [], count = 79;
var writeStream = fs.createWriteStream('./output.csv');
// stream.pipe(process.stdout);
stream.pipe(writeStream);
fs.createReadStream('midhun.km.csv')
    .pipe(csv.parse({ headers: true }))
    .on('data', (row) => {
        // console.log(typeof row);
        date = row.Date;
        if (date === prev) {
            buff.push(row);
        }
        else {
            console.log('\n----------------');
            console.log(buff);
            if (prev) {
                day = ms(prev, 'DD/MM/YY').format('dddd');
                formed = ms(prev, 'DD/MM/YY').format('DD-MMM-YY');
                console.log(`${prev} ${formed} ${day}`);
            }
            buff.forEach((e, i) => {
                if (!i) {
                    e.Days = 'Day ' + count;
                    e.Date = formed;
                }
                else {
                    e.Date = null;
                }
                if (i == 1) { e.Days = day }
                if (!e.Description) {
                    e.Description = e.Summary
                }
                console.log('write in loop');
                stream.write(e)
            });
            count++;
            if (buff.length === 1) {
                console.log('write for single item');
                stream.write({ 'Days': day })
            }
            console.log('writing empty line');
            if (prev) { writeStream.write('\n,,,,,'); }
            buff.length = 0;
            buff.push(row);
        }
        prev = date;
    })
    .on('error', (err) => {
        console.log("\n\nerror occurred!");
        console.log(err);

    })
    .on('end', () => {
        console.log("\n\nCSV file successfully processed");
        stream.end();

    });
