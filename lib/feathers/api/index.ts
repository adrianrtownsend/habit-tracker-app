// const messageService = feathersClient.service('messages');

// messageService.on('created', (message) =>
// 	console.log('Created a message', message)
// );

// // Use the messages service from the server
// messageService.create({
// 	text: 'Message from client',
// });

export * as task from './task';
export * as instance from './instance';
export * as user from './user';
