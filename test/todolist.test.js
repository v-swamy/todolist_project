const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');


// eslint-disable-next-line max-lines-per-function
describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray() returns the TodoList in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('first() returns first todo object in list', () => {
    expect(list.first()).toBe(todo1);
  });

  test('last() returns the last todo object in list', () => {
    expect(list.last()).toBe(todo3);
  });

  test('shift() removes and returns the first todo object in list', () => {
    let todo = list.shift();
    expect(todo).toBe(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pop() removed and returns the last todo object in list', () => {
    let todo = list.pop();
    expect(todo).toBe(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('isDone() returns true when all items in list are done and false if not', () => {
    list.markDone('Buy milk');
    expect(list.isDone()).toBe(false);
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('add() throws a TypeError if not a Todo object', () => {
    expect(() => list.add('not a Todo')).toThrow(TypeError);
    let list2 = new TodoList("2nd list");
    expect(() => list.add('not a Todo')).toThrow(TypeError);
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add(list2)).toThrow(TypeError);
  });

  test('itemAt() should return Todo object at index and throw ReferenceError if index is invalid', () => {
    expect(list.itemAt(0)).toBe(todo1);
    expect(list.itemAt(1)).toBe(todo2);
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
  });

  test('markDoneAt() should mark Todo object at index done and throw ReferenceError if index is invalid', () => {
    list.markDoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
    expect(() => list.markDoneAt(4)).toThrow(ReferenceError);
  });

  test('markUndoneAt() should mark Todo object at index undone and throw ReferenceError if index is invalid', () => {
    list.markAllDone();
    list.markUndoneAt(1);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
    expect(() => list.markDoneAt(4)).toThrow(ReferenceError);
  });

  test('markAllDone() should mark all todos in list done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('removeAt() should remove and return todo object at index and throw ReferenceError if index is invalid', () => {
    let todo = list.removeAt(1)[0];
    expect(todo).toEqual(todo2);
    expect(list.size()).toEqual(2);
    expect(list.toArray()).toEqual([todo1, todo3]);
    expect(() => list.removeAt(4)).toThrow(ReferenceError);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('toString() returns a different string for done todo', () => {
    list.markDoneAt(1);
    let string = `---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('toString() returns a different string for all done todos', () => {
    list.markAllDone();
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('forEach() iterates over all todos in list', () => {
    list.forEach(todo => todo.title = 'TEST');
    expect(todo1.title).toBe('TEST');
    expect(todo2.title).toBe('TEST');
    expect(todo3.title).toBe('TEST');
  });

  test('filter() returns new filtered list', () => {
    let filteredList = list.filter(todo => todo.title === "Clean room");
    expect(filteredList.size()).toBe(1);
    expect(filteredList.first()).toBe(todo2);
  });
});