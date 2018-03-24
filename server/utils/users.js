// [{
//   id: '/#12asdasd2',
//   name: 'Max',
//   room: 'The Office Fans'
// }]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor() {
    this.users = []
  }
  addUser(id, name, room) {
    const user = { id, name, room }
    this.users.push(user)
    return user
  }
}

module.exports = { Users }

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// var me = new Person('Max', 25);
// var description = me.getUserDescription();
// console.log(description);
