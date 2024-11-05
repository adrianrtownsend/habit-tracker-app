import feathersClient from '..';

// const messageService = feathersClient.service('messages');

// messageService.on('created', (message) =>
// 	console.log('Created a message', message)
// );

// // Use the messages service from the server
// messageService.create({
// 	text: 'Message from client',
// });

// users
const userService = feathersClient.service('users');

// tasks
const taskService = feathersClient.service('task');

export const getTasks = async (params: any) => {
	try {
		const t = await taskService.find({ query: params });
		console.log('res: ', t);
		return t;
	} catch (error) {
		console.error('error: ', error);
		return null;
	}
};

export const createTask = async (task: any) => {
	try {
		const t = await taskService.create(task);
		console.log('res: ', t);
		return t;
	} catch (error) {
		console.error('error: ', error);
		return null;
	}
};

export const updateTask = async (task: any) => {
	try {
		const t = await taskService.patch(task._id, task);
		console.log('res: ', t);
		return t;
	} catch (error) {
		console.error('error: ', error);
		return null;
	}
};

export const deleteTask = async (task: any) => {
	try {
		const t = await taskService.remove(task._id);
		console.log('res: ', t);
		return t;
	} catch (error) {
		console.error('error: ', error);
		return null;
	}
};

// instances
const instanceService = feathersClient.service('instance');
