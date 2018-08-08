'use strict';

class _Node {
  constructor(data, next) {
    this.data = data,
    this.next = next;
  }
}
class LinkedList {

  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  /**Inserts a new node after a node containing the key.*/
  insertAfter(key, itemToInsert) {
    let tempNode = this.head;
    while (tempNode !== null && tempNode.value !== key) {
      tempNode = tempNode.next;
    }
    if (tempNode !== null) {
      tempNode.next = new _Node(itemToInsert, tempNode.next);
    }
  }

  /* Inserts a new node before a node containing the key.*/
  insertBefore(key, itemToInsert) {
    if (this.head === null) {
      return;
    }
    if (this.head.value === key) {
      this.insertFirst(itemToInsert);
      return;
    }
    let prevNode = null;
    let currNode = this.head;
    while (currNode !== null && currNode.value !== key) {
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Node not found to insert');
      return;
    }
    prevNode.next = new _Node(itemToInsert, currNode);
  }

  insertAt(nthPosition, itemToInsert) {
    if (nthPosition < 0) {
      throw new Error('Position error');
    }
    if (nthPosition === 0) {
      this.insertFirst(itemToInsert);
    } else {
      const node = this._findNthElement(nthPosition - 1);
      const newNode = new _Node(itemToInsert, null);
      newNode.next = node.next;
      node.next = newNode;
    }
  }

  _findNthElement(position) {
    let node = this.head;
    for (let i = 0; i < position; i++) {
      if (node.next === null) {
        return node;
      }
      node = node.next;
    }
    return node;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head === item) {
      this.head = this.head.next;
      return;
    }
    let currNode = this.head;
    let previousNode = this.head;
    while ((currNode !== null) && (currNode.value !== item)) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }

  find(item) { 
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      }
      else {g
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  removeHead() {
    return this.head = this.head.next;
  }

  setM(wasCorrect) {
    let currentQuestion = this.head;
    if (wasCorrect === true) {
      currentQuestion.data.mValue = currentQuestion.data.mValue * 2;
    }
    else {
      currentQuestion.data.mValue = 1;
    }
    this.removeHead();

    return this.insertAt(currentQuestion.data.mValue, currentQuestion.data);

  }
}

module.exports = LinkedList;