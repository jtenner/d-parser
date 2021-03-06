# dice-roller
This module is designed to do generic dice rolling. It exposes three functions but the most important one is the `roll` function.

# Basic Usage

To get access to the dice-roller function:

```javascript
//es2015 imports
import { roll } from 'dice-roller';

//commonjs
let { roll } = require('dice-roller');

//script
let roll = dr.roll;
```

## Simple Rolls

Simple rolls look like this.

```javascript
roll('1d20');
//{ text: '18', value: 18 }

```

## Addition and Subtraction

Any addition or subtraction will show you the grouped results of each set of dice.

```javascript
roll('3d10 + 6d20');
//{ text: '10 + 60', value: 70 }

roll('5d6 + 3d10 - 3d4');
//{ text: '10 + 13 - 8', value: 15 }

//static numbers work too
roll('1d20 + 2');
//{ text: '15 + 2', value: 17 }
```

## Multiplication and Grouping

The "*" symbol must explicitly be used, but it logically groups the "Order of Operations" correctly.

```javascript
roll('3d10 * 3d10');
//{ text: '24 * 10', value: 240 }

roll('4 + 5 * 2d10')
//{ text: '4 + 5 * 4', value: 24 }
```

Grouping works too.

```javascript
roll('(5d6 + 3d10 - 3d4) * 2');
//{ text: '(16 + 12 - 9) * 2', value: 38 }
```