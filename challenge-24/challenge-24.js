/*
Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
o código, conforme vimos na aula anterior. Quebrar as responsabilidades
em funções, onde cada função faça somente uma única coisa, e faça bem feito.

- Remova as duplicações de código;
- agrupe os códigos que estão soltos em funções (declarações de variáveis,
listeners de eventos, etc);
- faça refactories para melhorar esse código, mas de forma que o mantenha com a
mesma funcionalidade.
*/
(function(win, doc){
  'use strict';

  var $visor = doc.querySelector('[data-js="visor"]');
  var $buttonsNumbers = doc.querySelectorAll('[data-js="button-number"]');
  var $buttonsOperations = doc.querySelectorAll('[data-js="button-operation"]');
  var $buttonCE = doc.querySelector('[data-js="button-ce"]');
  var $buttonEqual = doc.querySelector('[data-js="button-equal"]');

  function initialize() {
    initHandles();
  }

  function initHandles() {
    Array.prototype.forEach.call($buttonsNumbers, function(button) {
      button.addEventListener('click', handleClickNumber, false);
    });
    Array.prototype.forEach.call($buttonsOperations, function(button) {
      button.addEventListener('click', handleClickOperation, false);
    });
    $buttonCE.addEventListener('click', handleClickCE, false);
    $buttonEqual.addEventListener('click', handleClickEqual, false);
  }

  function handleClickNumber() {
    $visor.value += this.value;
  }

  function handleClickOperation() {
    $visor.value = removeLastItemIfItIsAnOperator($visor.value);
    $visor.value += this.value;
  }

  function handleClickCE() {
    $visor.value = 0;
  }

  function getOperators() {
    return Array.prototype.map.call($buttonsOperations, function (operator) {
      return operator.value;
    });
  }

  function isLastItemAnOperation(number) {
    var operations = getOperators();
    var lastItem = number.split('').pop();
    return operations.some(function(operator) {
      return operator === lastItem;
    });
  }

  function removeLastItemIfItIsAnOperator(number) {
    if(isLastItemAnOperation(number)) {
      return number.slice(0, -1);
    }
    return number;
  }

  function handleClickEqual() {
    $visor.value = calculate();
  }

  function getAllValues() {
    $visor.value = removeLastItemIfItIsAnOperator($visor.value);
    var regexOperators = getRegexOperators();
    var allValues = $visor.value.match(regexOperators);
    return allValues;
  }

  function getRegexOperators() {
    return new RegExp('\\d+[' + getOperators().join('') + ']?','g');
  }

  function calculate() {
    var allValues = getAllValues();
    var total = allValues.reduce(function(accumulated, actual) {
      var firstValue = accumulated.slice(0, -1);
      var operator = accumulated.split('').pop();
      var lastValue = removeLastItemIfItIsAnOperator(actual);
      var lastOperator = isLastItemAnOperation(actual) ? actual.split('').pop() : '';
      return calculateOperations(operator, firstValue, lastValue) + lastOperator;
    });
    return total;
  }

  function calculateOperations(operator, firstValue, lastValue) {
    switch(operator) {
      case getOperators()[0]:
        return Number(firstValue) + Number(lastValue);
      case getOperators()[1]:
        return Number(firstValue) - Number(lastValue);
      case getOperators()[2]:
        return Number(firstValue) * Number(lastValue);
      case getOperators()[3]:
        return Number(firstValue) / Number(lastValue);
    }
  }

  initialize();

}(window, document));
