import chalk from 'chalk';

export const infoWrapper = (string) => {
    console.log(chalk.black.bold.bgRgb(255, 210, 235)('----------------->' + chalk.rgb(255, 210, 235).bold.bgBlack(`  ${string}  `)));
    console.log('                                                                                                            ')
};

export const objWrapper = (obj) => {
    console.log(chalk.rgb(255, 210, 235).bold.bgBlack(obj))
}
