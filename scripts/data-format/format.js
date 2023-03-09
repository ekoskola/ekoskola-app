const fs = require('fs');
const path = require('path');
const Excel = require('exceljs');
const axios = require('axios');

const workbook = new Excel.Workbook();
workbook.xlsx.readFile('./games-database.xlsx').then(async function(a) {
  const gamePromises = [];
  const worksheet = a.getWorksheet('Sheet1');
  worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
    // Ignore 2 first rows since they are header.
    // if (rowNumber < 3 || rowNumber > 5) {
    if (rowNumber < 3) {
      return;
    }

    const promise = new Promise(async (resolve, reject) => {
      const url = row.getCell('BH').value;
      const game = {
        file_id: url && url.text,
        name: row.getCell('E').value,
        description: row.getCell('I').value,
        objetive_1: row.getCell('F').value,
        objetive_2: row.getCell('G').value,
        objetive_3: row.getCell('H').value,
        location: getLocation(row),
        topics: getTopics(row),
        classes: getClases(row),
        grade: getGrade(row),
        ekoskola_steps: getEkoskolaSteps(row),
        subjects: getSubjects(row),
        timing: getTiming(row),
        number_teachers: [row.getCell('BF').value],
        physical_activity: [row.getCell('BG').value],
      };
      try {
        const response = await axios({
          method: 'get',
          url: url.hyperlink,
          responseType: 'stream',
        });

        response.data.pipe(
          fs
            .createWriteStream(
              path.join(__dirname, `/../server/uploads/${url.text}`)
            )
            .on('end', function() {
              resolve(game);
            })
        );
      } catch (error) {
        console.log('game.name', game.name);
        console.log('url.text', url.text);
        console.log('url.hiperlink', url.hyperlink);
        resolve(game);
      }
    });

    gamePromises.push(promise);
  });

  const games = await Promise.all(gamePromises);
  console.log('games', games);

  fs.writeFile(
    path.join(__dirname, `/../server/src/db/migrations/games.json`),
    JSON.stringify(games),
    'utf8',
    function(error) {
      if (error) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(error);
      }

      console.log('JSON file has been saved.');
    }
  );
});

function getSubjects(row) {
  // eco_team is not in the excel, is to be included after.
  const subjects = [];
  if (row.getCell('Y').value) {
    subjects.push('czech');
  }
  if (row.getCell('Z').value) {
    subjects.push('math');
  }
  if (row.getCell('AA').value) {
    subjects.push('biologie');
  }
  if (row.getCell('AB').value) {
    subjects.push('natural_history');
  }
  if (row.getCell('AC').value) {
    subjects.push('language');
  }
  if (row.getCell('AD').value) {
    subjects.push('ecology');
  }
  if (row.getCell('AE').value) {
    subjects.push('civics');
  }
  if (row.getCell('AF').value) {
    subjects.push('chemistry');
  }
  if (row.getCell('AG').value) {
    subjects.push('general_knowledge');
  }
  if (row.getCell('AH').value) {
    subjects.push('homeland_studies');
  }
  if (row.getCell('AI').value) {
    subjects.push('natural_science');
  }
  if (row.getCell('AJ').value) {
    subjects.push('physics');
  }
  if (row.getCell('AK').value) {
    subjects.push('geography');
  }

  return subjects;
}

function getEkoskolaSteps(row) {
  const ekoskolaSteps = [];

  if (row.getCell('AV').value) {
    ekoskolaSteps.push('ecoteam');
  }
  if (row.getCell('AW').value) {
    ekoskolaSteps.push('analysis');
  }
  if (row.getCell('AX').value) {
    ekoskolaSteps.push('action_plan');
  }
  if (row.getCell('AY').value) {
    ekoskolaSteps.push('tracking');
  }
  if (row.getCell('AZ').value) {
    ekoskolaSteps.push('ekology_education');
  }
  if (row.getCell('BA').value) {
    ekoskolaSteps.push('information_cooperation');
  }
  if (row.getCell('BB').value) {
    ekoskolaSteps.push('ecoschool_dex');
  }
  return ekoskolaSteps;
}

function getGrade(row) {
  const grades = [];
  if (row.getCell('J').value) {
    grades.push('kinder_garden');
  }
  if (row.getCell('K').value) {
    grades.push('first_grade');
  }
  if (row.getCell('L').value) {
    grades.push('second_grade');
  }
  if (row.getCell('M').value) {
    grades.push('medium_grade');
  }
  return grades;
}

function getClases(row) {
  const classes = [];

  if (row.getCell('N').value) {
    classes.push('class_kinder_garden');
  }
  if (row.getCell('O').value) {
    classes.push('class_1');
  }
  if (row.getCell('P').value) {
    classes.push('class_2');
  }
  if (row.getCell('Q').value) {
    classes.push('class_3');
  }
  if (row.getCell('R').value) {
    classes.push('class_4');
  }
  if (row.getCell('S').value) {
    classes.push('class_5');
  }
  if (row.getCell('T').value) {
    classes.push('class_6');
  }
  if (row.getCell('U').value) {
    classes.push('class_7');
  }
  if (row.getCell('V').value) {
    classes.push('class_8');
  }
  if (row.getCell('W').value) {
    classes.push('class_9');
  }
  if (row.getCell('X').value) {
    classes.push('medium_grade');
  }
  return classes;
}

function getTopics(row) {
  const topics = [];
  if (row.getCell('AL').value) {
    topics.push('garbage');
  }
  if (row.getCell('AM').value) {
    topics.push('energy');
  }
  if (row.getCell('AN').value) {
    topics.push('water');
  }
  if (row.getCell('AO').value) {
    topics.push('enviroment');
  }
  if (row.getCell('AP').value) {
    topics.push('transport');
  }
  if (row.getCell('AQ').value) {
    topics.push('resposible_consumer');
  }
  if (row.getCell('AR').value) {
    topics.push('biodiversity');
  }
  if (row.getCell('AS').value) {
    topics.push('climate_change');
  }
  if (row.getCell('AT').value) {
    topics.push('food_world');
  }
  if (row.getCell('AU').value) {
    topics.push('methodolical_advice');
  }
  return topics;
}

function getTiming(row) {
  switch (row.getCell('BC').value) {
    case '10 min':
      return ['10_min'];
    case '30 min':
      return ['30_min'];
    case '45 min':
      return ['45_min'];
    case '90 min':
      return ['90_min'];
    case 'projekt':
      return ['project'];
    default:
      throw new Error('getTiming was not found');
  }
}

function getLocation(row) {
  const location = [];
  if (row.getCell('BD').value) {
    location.push('outdoor');
  }
  if (row.getCell('BE').value) {
    location.push('indoor');
  }
  return location;
}
