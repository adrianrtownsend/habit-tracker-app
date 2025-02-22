// task.ts

import feathersClient from '..';

const taskService = feathersClient.service('task');

export const getTasks = async (params: any) => {
	try {
		const t = await taskService.find({ query: params });
		return t;
	} catch (error) {
		console.error('error: ', error);
		return null;
	}
};

export const createTask = async (task: any) => {
	try {
		const t = await taskService.create({
			text: task.text,
			userId: feathersClient.get('user')._id,
		});
		return t;
	} catch (error) {
		console.error('error: ', error);
		return null;
	}
};

export const updateTask = async (task: any) => {
	try {
		const t = await taskService.patch(task._id, task);
		return t;
	} catch (error) {
		console.error('error: ', error);
		return null;
	}
};

export const deleteTask = async (task: any) => {
	try {
		const t = await taskService.remove(task._id);
		return t;
	} catch (error) {
		console.error('error: ', error);
		return null;
	}
};
