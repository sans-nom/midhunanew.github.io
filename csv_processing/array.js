const csv = require('fast-csv');
const fs = require('fs');
const ms = require('moment');
const headers = ['Days', 'Date', 'Assigned Activities', 'Planned Activities', 'Actual Activities', 'Hours'];
const stream = csv.format({
    headers: headers,
    quote: '"'
});
let date, prev, day, formed, result = [headers], slNo = 79, loopCount = 0;
var writeStream = fs.createWriteStream('./output.csv');
// stream.pipe(process.stdout);
// stream.pipe(writeStream);
fs.createReadStream('midhun.km.csv')
    .pipe(csv.parse({ headers: true }))
    .on('data', (row) => {
        let { Issue, Summary, DateX, Time, Description } = row;
        prev = DateX;
        
        
        if (!Description) {
            Description = Summary.toLowerCase();
        }
        
        if (date !== prev) {
            if (loopCount === 1) {
                console.log('Adding one more line if it was one whole day task')
                day = ms(date, 'DD/MM/YY').format('dddd');
                result.push([day, '', '', '', '', '']);
            }
            console.log('RESET loopCount and push new line\n');
            result.push(['', '', '', '', '', '']);
            loopCount = 0;
            slNo++;
        }

        console.log(loopCount, date, prev, Time);

        if (loopCount === 0) {
            formed = ms(prev, 'DD/MM/YY').format('DD-MMM-YY');
            console.log('push first line');
            result.push(['Day ' + slNo, formed, Issue, Summary, Description, Time]);
        }
        else if (loopCount === 1) {
            day = ms(prev, 'DD/MM/YY').format('dddd');
            console.log('push second line');
            result.push([day, '', Issue, Summary, Description, Time]);
        }
        else {
            console.log('push additional line');
            result.push(['', '', Issue, Summary, Description, Time]);
        }

        loopCount++;

        date = prev;
    })
    .on('error', (err) => {
        console.log("\n\nerror occurred!");
        console.log(err);

    })
    .on('end', () => {
        stream.end();
        // console.log(result.length);
        // console.log(result[128]);
        csv.write(result).pipe(process.stdout);
        csv.write(result).pipe(writeStream);
        console.log("\n\nCSV file successfully processed");
    });
