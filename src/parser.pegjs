Expression = Sum

Sum = left:Product _ operator:("+" / "-") _ right:Sum {
  return {
    type: 'sum',
    operator: operator,
    left: left,
    right: right
  }
} / Product

Product = left:Grouping _ "*" _ right:Product {
  return {
    type: 'product',
    left: left,
    right: right
  };
} / Grouping

Grouping = "(" _ argument:Expression _ ")" {
  return {
    type: 'group',
    argument: argument
  }
} / Roll

Roll = count:Number "d" value:Number {
  return {
    type: 'roll',
    count: count,
    value: Math.max(value, 2)
  };
} / Static

Static = value:Number {
  return {
    type: 'static',
    value: value
  };
}
_ = [\t\r\n ]*
Number = [0-9]+ { return parseInt(text()); }