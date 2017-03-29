let prototype = {
  toString(type) {
    return type === 'extended' ? `${this.extended} = ${this.value}` : `${this.text} = ${this.value}` ;
  },
  valueOf() {
    return this.value;
  }
};

module.exports = function evaluate(node) {
  switch(node.type) {
    case 'static':
      return Object.assign(Object.create(prototype), {
        extended: node.value.toString(),
        text: node.value.toString(),
        value: node.value
      });
    case 'group':
      let argument = evaluate(node.argument);
      return Object.assign(Object.create(prototype), {
        extended: `(${argument.extended})`,
        text: `(${argument.text})`,
        value: argument.value
      });
    case 'sum':
    case 'product':
      let left = evaluate(node.left),
        right = evaluate(node.right),
        operator = node.type === 'sum' ? node.operator : '*';
      return Object.assign(Object.create(prototype), {
        extended: `${left.extended} ${operator} ${right.extended}`,
        text: `${left.text} ${operator} ${right.text}`,
        value: operator === '+' ? left.value + right.value :
          operator === '-' ? left.value - right.value :
          operator === '*' ? left.value * right.value : ''
      });
    case 'roll':
      let value = 0, roll, rolls = [];
      for(let i = 0; i < node.count; i++) {
        roll = Math.floor(Math.random() * node.value) + 1;
        rolls.push(roll);
        value += roll;
      }
      return Object.assign(Object.create(prototype), {
        extended: rolls.length > 1 ? `(${rolls.join(' + ')})` : value.toString(),
        text: value.toString(),
        value: value
      });
  }
};