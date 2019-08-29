const csv = require('fast-csv');
const fs = require('fs');
const ms = require('moment');
const headers = ['Days', 'Date', 'Assigned Activities', 'Planned Activities', 'Actual Activities', 'Hours'];
const stream = csv.format({
    headers: headers,
    quote: '"'
});
let date, prev, day, formed, result = [headers], slNo = 80, loopCount = 0;
var writeStream = fs.createWriteStream('./output.csv');
// stream.pipe(process.stdout);
// stream.pipe(writeStream);
fs.createReadStream('midhun.km.csv')
    .pipe(csv.parse({ headers: true }))
    .on('data', (row) => {
        let { Issue, Summary, DateX, Time, Description } = row;
        prev = DateX;
        console.log(loopCount);
        

        if (!Description) {
            Description = Summary.toLowerCase();
        }

        if (loopCount === 0) {
            formed = ms(prev, 'DD/MM/YY').format('DD-MMM-YY');
            result.push(['Day ' + slNo, formed, Issue, Summary, Description, Time]);
        }
        else if (loopCount === 1) {
            day = ms(prev, 'DD/MM/YY').format('dddd');
            result.push([day, '', Issue, Summary, Description, Time]);
        }
        else {
            result.push(['', '', Issue, Summary, Description, Time]);
        }

        if (date !== prev) {
            console.log('RESET and push new line');
            if (loopCount === 0) {
                day = ms(prev, 'DD/MM/YY').format('dddd');
                result.push([day, '', '', '', '', '']);
            }
            result.push(['', '', '', '', '', '']);
            loopCount = 0;
            slNo++;
        }
        else {
            loopCount++;
        }

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
